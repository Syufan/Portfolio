function getChatbotApiUrl() {
  return process.env.NEXT_PUBLIC_CHATBOT_API_URL?.trim() || "";
}

export function isChatbotEnabled() {
  return getChatbotApiUrl().length > 0;
}

export async function getHealth() {
  const chatbotApiUrl = getChatbotApiUrl();
  if (!isChatbotEnabled()) {
    throw new Error("Chatbot is disabled");
  }

  const response = await fetch(`${chatbotApiUrl}/health`);
  if (!response.ok) {
    throw new Error("Failed to fetch health status");
  }

  return response.json();
}

export async function getSuggestions() {
  const chatbotApiUrl = getChatbotApiUrl();
  if (!isChatbotEnabled()) {
    throw new Error("Chatbot is disabled");
  }

  const response = await fetch(`${chatbotApiUrl}/chat`);
  if (!response.ok) {
    throw new Error("Failed to fetch suggestions");
  }

  return response.json();
}

export async function sendMessage(
  message: string,
  history: { role: string; content: string }[],
  onChunk: (chunk: string) => void,
) {
  const chatbotApiUrl = getChatbotApiUrl();
  if (!isChatbotEnabled()) {
    throw new Error("Chatbot is disabled");
  }

  const response = await fetch(`${chatbotApiUrl}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    let errorData: any = null;
    try {
      errorData = await response.json();
    } catch {}
    throw {
      status: response.status,
      detail:
        errorData?.detail?.message ??
        errorData?.detail ??
        "Something went wrong. Please try again later.",
      remainingMessages: errorData?.detail?.remaining_messages ?? null,
      maxMessages: errorData?.detail?.max_messages ?? null,
    };
  }

  const remainingMessages = response.headers.get("X-Remaining-Messages");
  const maxMessages = response.headers.get("X-Max-Messages");

  if (!response.body) {
    throw {
      status: 500,
      detail: "Empty response body",
    };
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    result += chunk;
    onChunk(result);
  }

  return {
    result,
    remainingMessages: remainingMessages ? Number(remainingMessages) : null,
    maxMessages: maxMessages ? Number(maxMessages) : null,
  };
}
