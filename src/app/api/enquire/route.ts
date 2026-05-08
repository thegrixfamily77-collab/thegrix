import { incrementEnquiries } from "@/lib/analytics/stats-store";
import { NextResponse } from "next/server";

const DEFAULT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby4L15xIrqzqEZ8qDJ6LX7g0Y-OlryeKWQvqKk1OaagelAqVCS61xigrfJIRhKGvaSdSA/exec";

export async function POST(req: Request) {
  let payload: Record<string, unknown> = {};
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const url = process.env.APPS_SCRIPT_WEBHOOK_URL ?? DEFAULT_APPS_SCRIPT_URL;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json,text/plain,*/*" },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
      }),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Network error" },
      { status: 502 },
    );
  }

  const text = await res.text().catch(() => "");
  if (!res.ok) {
    return NextResponse.json(
      { ok: false, error: text || `Apps Script returned ${res.status}` },
      { status: 502 },
    );
  }

  try {
    await incrementEnquiries();
  } catch {
    /* non-fatal — enquiry still succeeded upstream */
  }

  // Apps Script responses vary; we return a stable ack to the client.
  return NextResponse.json({
    ok: true,
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
    upstream: text ? text.slice(0, 2000) : undefined,
  });
}

