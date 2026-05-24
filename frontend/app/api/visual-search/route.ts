import { NextRequest, NextResponse } from "next/server";

const HF_SPACE_URL = process.env.HF_SPACE_URL!;

export async function GET() {
  try {
    const res = await fetch(`${HF_SPACE_URL}/health`, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ status: "unavailable" }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const k = req.nextUrl.searchParams.get("k") ?? "8";

  try {
    const res = await fetch(`${HF_SPACE_URL}/search?k=${k}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Search failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }
}
