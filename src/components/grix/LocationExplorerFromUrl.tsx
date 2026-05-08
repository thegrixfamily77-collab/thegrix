"use client";

import { LocationExplorer, type LocationPreview } from "@/components/grix/LocationExplorer";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function LocationExplorerFromUrl({ locations }: { locations: LocationPreview[] }) {
  const searchParams = useSearchParams();
  const rawQ = (searchParams.get("q") ?? "").trim();
  const focus = searchParams.get("focus") === "1";

  const [q, setQ] = useState(rawQ);
  useEffect(() => setQ(rawQ), [rawQ]);

  const autoFocus = useMemo(() => focus, [focus]);

  return <LocationExplorer locations={locations} initialQuery={q} autoFocus={autoFocus} />;
}

