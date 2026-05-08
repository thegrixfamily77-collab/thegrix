import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";

import { requireAdminSession } from "@/lib/admin/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

const MIME_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function extFromMime(mime: string): string | undefined {
  return MIME_EXT[mime];
}

export async function POST(req: Request) {
  try {
    await requireAdminSession();
  } catch (err) {
    const status = err instanceof Error && "status" in err ? Number((err as { status?: number }).status) : 500;
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Error" }, { status });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || typeof file !== "object" || !("arrayBuffer" in file)) {
    return NextResponse.json({ ok: false, error: 'Expected multipart field "file"' }, { status: 400 });
  }

  const blob = file as File;
  if (blob.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "File too large (max 5 MB)" }, { status: 400 });
  }

  const mime = blob.type?.trim().toLowerCase() || "";
  const ext = extFromMime(mime);
  if (!ext) {
    return NextResponse.json(
      { ok: false, error: "Unsupported type. Use JPEG, PNG, WebP, or GIF." },
      { status: 400 },
    );
  }

  const buf = Buffer.from(await blob.arrayBuffer());
  const name = `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;
  const uploadsDir = path.join(process.cwd(), "public", "content", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, name), buf);

  const urlPath = `/content/uploads/${name}`;
  return NextResponse.json({ ok: true, url: urlPath });
}
