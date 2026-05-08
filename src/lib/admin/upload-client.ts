/**
 * Upload a local image from the admin UI; server stores it under `/public/content/uploads/`.
 */
export async function uploadAdminImage(
  file: File,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const fd = new FormData();
  fd.append("file", file);
  try {
    const res = await fetch("/api/admin/upload-image", { method: "POST", body: fd });
    const json = (await res.json()) as { ok?: boolean; url?: string; error?: string };
    if (!res.ok || !json.ok || !json.url) {
      return { ok: false, error: json.error ?? `Upload failed (${res.status})` };
    }
    return { ok: true, url: json.url };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Network error" };
  }
}
