import { NextRequest, NextResponse } from "next/server";

const HF_SPACE_URL = process.env.HF_SPACE_URL!;
const HEALTH_TIMEOUT_MS = 30_000;
const SEARCH_TIMEOUT_MS = 120_000;

function abortAfter(ms: number): { signal: AbortSignal; cancel: () => void } {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, cancel: () => clearTimeout(id) };
}

export async function GET() {
  const { signal, cancel } = abortAfter(HEALTH_TIMEOUT_MS);
  try {
    const res = await fetch(`${HF_SPACE_URL}/health`, {
      cache: "no-store",
      signal,
    });
    cancel();
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ status: "unavailable" }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const k = req.nextUrl.searchParams.get("k") ?? "8";
  const { signal, cancel } = abortAfter(SEARCH_TIMEOUT_MS);

  try {
    const res = await fetch(`${HF_SPACE_URL}/search?k=${k}`, {
      method: "POST",
      body: formData,
      signal,
    });
    cancel();

    if (!res.ok) {
      return NextResponse.json(
        { error: "Search failed" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }
}
