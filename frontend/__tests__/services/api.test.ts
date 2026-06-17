import {
  getSuggestions,
  getHealth,
  sendMessage,
  isChatbotEnabled,
} from "@/services/api";
import { createProfileService } from "@/services/profile";
import { profileData } from "@/data/profile";

describe("api", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_CHATBOT_API_URL = "https://chat.example.com";
    jest.restoreAllMocks();
  });

  it("profile service should return local profile data", async () => {
    const profileService = createProfileService(profileData);
    const result = await profileService.getProfile();

    expect(result.about.name).toBe("Jeff Zhang");
  });

  it("profile service should return local projects", async () => {
    const profileService = createProfileService(profileData);
    const result = await profileService.getProjects();

    expect(result).toHaveLength(5);
  });

  it("isChatbotEnabled should reflect the env flag", () => {
    expect(isChatbotEnabled()).toBe(true);
  });

  it("getSuggestions should return suggestions", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        suggestions: ["What are your skills?"],
      }),
    });

    const result = await getSuggestions();

    expect(result).toEqual({ suggestions: ["What are your skills?"] });
  });

  it("sendMessage should stream message chunks", async () => {
    const mockReader = {
      read: jest
        .fn()
        .mockResolvedValueOnce({
          done: false,
          value: new TextEncoder().encode("Jeff"),
        })
        .mockResolvedValueOnce({
          done: false,
          value: new TextEncoder().encode(" Zhang"),
        })
        .mockResolvedValueOnce({ done: true, value: undefined }),
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      headers: {
        get: jest.fn((name: string) => {
          if (name === "X-Remaining-Messages") return "9";
          if (name === "X-Max-Messages") return "10";
          return null;
        }),
      },
      body: { getReader: () => mockReader },
    });

    const chunks: string[] = [];
    const result = await sendMessage("What are your skills?", [], (chunk) =>
      chunks.push(chunk),
    );

    expect(chunks).toEqual(["Jeff", "Jeff Zhang"]);
    expect(result).toEqual({
      result: "Jeff Zhang",
      remainingMessages: 9,
      maxMessages: 10,
    });
  });

  it("sendMessage should throw when request fails", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    await expect(sendMessage("hello", [], () => {})).rejects.toThrow();
  });

  it("getHealth should return health status", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ ok: true }),
    });

    const result = await getHealth();

    expect(result).toEqual({ ok: true });
  });
});
