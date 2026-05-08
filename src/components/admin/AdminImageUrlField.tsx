"use client";

import { uploadAdminImage } from "@/lib/admin/upload-client";
import { useCallback, useId, useState } from "react";

export function AdminImageUrlField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  const id = useId();
  const urlId = `${id}-url`;
  const fileId = `${id}-file`;
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const onPick = useCallback(
    async (file: File | undefined) => {
      setNotice(null);
      if (!file) return;
      setBusy(true);
      try {
        const result = await uploadAdminImage(file);
        if (!result.ok) {
          setNotice(result.error);
          setBusy(false);
          return;
        }
        onChange(result.url);
        setNotice(`Saved as ${result.url}`);
      } catch (e) {
        setNotice(e instanceof Error ? e.message : "Upload failed");
      }
      setBusy(false);
    },
    [onChange],
  );

  const field =
    "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={urlId} className="text-xs font-semibold uppercase tracking-wide text-slate-600">
        {label}
      </label>
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      <input
        id={urlId}
        className={`${field} font-mono text-[13px]`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/image.jpg — or upload a file below"
      />
      <div className="flex flex-wrap items-center gap-3">
        <input
          id={fileId}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
          disabled={busy}
          className="max-w-[min(100%,320px)] text-xs text-slate-700 file:mr-2 file:rounded-full file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-slate-800 hover:file:bg-slate-200"
          onChange={(e) => void onPick(e.target.files?.[0])}
        />
        {busy ? <span className="text-xs font-medium text-slate-600">Uploading…</span> : null}
      </div>
      {notice ? <p className="text-xs text-slate-600">{notice}</p> : null}
      {value.trim() ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value.trim()}
          alt=""
          className="mt-1 max-h-28 w-auto max-w-full rounded-xl border border-slate-200 object-cover"
        />
      ) : null}
    </div>
  );
}

/** Adds an uploaded URL as a new line (for multi-line gallery fields). */
export function GalleryImageAppender({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
        disabled={busy}
        className="max-w-[min(100%,320px)] text-xs text-slate-700 file:mr-2 file:rounded-full file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-slate-800 hover:file:bg-slate-200"
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (!f) return;
          void (async () => {
            setNotice(null);
            setBusy(true);
            const result = await uploadAdminImage(f);
            setBusy(false);
            if (!result.ok) {
              setNotice(result.error);
              return;
            }
            onUploaded(result.url);
            setNotice(`Added ${result.url}`);
          })();
        }}
      />
      {busy ? <span className="text-xs font-medium text-slate-600">Uploading…</span> : null}
      {notice ? <span className="text-xs text-slate-600">{notice}</span> : null}
    </div>
  );
}
