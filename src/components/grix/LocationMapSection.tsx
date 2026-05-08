"use client";

import {
  getLocationMapData,
  MAP_POI_CATEGORY_LABEL,
  type LocationMapData,
  type MapPoiCategory,
} from "@/data/location-maps";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";

const CATEGORY_HEX: Record<MapPoiCategory, string> = {
  connectivity: "#2563eb",
  hospital: "#dc2626",
  school: "#d97706",
  cafe: "#059669",
  employment: "#7c3aed",
};

/** v2 loader: setOptions() once, then importLibrary("maps"). Loader class removed. */
let mapsBootstrapKey: string | null = null;

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const w = window as unknown as { google?: { maps?: { Map?: unknown } } };
  if (w.google?.maps?.Map) return Promise.resolve();
  if (mapsBootstrapKey === null) {
    setOptions({ key: apiKey, v: "weekly" });
    mapsBootstrapKey = apiKey;
  }
  return importLibrary("maps").then(() => undefined);
}

function openMapsAt(lat: number, lng: number) {
  const q = encodeURIComponent(`${lat},${lng}`);
  window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank", "noopener,noreferrer");
}

interface Props {
  locationName: string;
  slug: string;
}

export function LocationMapSection({ locationName, slug }: Props) {
  const mapData: LocationMapData | undefined = getLocationMapData(slug);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? "";
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapData || !apiKey || !containerRef.current) return;

    let cancelled = false;
    const el = containerRef.current;

    void (async () => {
      try {
        await loadGoogleMapsScript(apiKey);
        if (cancelled || !el) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Google Maps JS API loaded dynamically
        const googleMaps = (window as unknown as { google: { maps: any } }).google.maps;

        const map = new googleMaps.Map(el, {
          center: mapData.center,
          zoom: mapData.zoom ?? 14,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
        });

        new googleMaps.Polygon({
          paths: mapData.highlightPath,
          strokeColor: "#0f766e",
          strokeOpacity: 0.95,
          strokeWeight: 2,
          fillColor: "#14b8a6",
          fillOpacity: 0.18,
          map,
        });
        const bounds = new googleMaps.LatLngBounds();
        mapData.highlightPath.forEach((p) => bounds.extend(p));
        mapData.pois.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
        map.fitBounds(bounds, 48);

        const info = new googleMaps.InfoWindow();

        mapData.pois.forEach((poi) => {
          const color = CATEGORY_HEX[poi.category];
          const marker = new googleMaps.Marker({
            map,
            position: { lat: poi.lat, lng: poi.lng },
            title: poi.label,
            icon: {
              path: googleMaps.SymbolPath.CIRCLE,
              fillColor: color,
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
              scale: 8,
            },
          });
          marker.addListener("click", () => {
            info.setContent(
              `<div style="padding:4px 2px;max-width:220px;font-size:13px;">
                <div style="font-weight:600;margin-bottom:4px;">${poi.label}</div>
                <div style="color:#475569;font-size:11px;">${MAP_POI_CATEGORY_LABEL[poi.category]}</div>
              </div>`,
            );
            info.open({ map, anchor: marker });
          });
        });
      } catch {
        if (!cancelled) setLoadError("Map could not be loaded. Check your API key and billing.");
      }
    })();

    return () => {
      cancelled = true;
      el.innerHTML = "";
    };
  }, [apiKey, mapData]);

  if (!mapData) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03]">
      <h2 className="font-display text-xl font-semibold text-slate-900">Area map & nearby anchors</h2>
      <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-600">
        Micro-market highlight (shaded), plus representative connectivity, healthcare, schools, dining, and major
        employment anchors around {locationName}. Tap markers for details; illustrative points for research context.
      </p>

      <div className="mt-4 flex flex-wrap gap-3 text-[11px] font-medium">
        {(Object.keys(MAP_POI_CATEGORY_LABEL) as MapPoiCategory[]).map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700">
            <span className="h-2 w-2 rounded-full ring-2 ring-white" style={{ backgroundColor: CATEGORY_HEX[k] }} />
            {MAP_POI_CATEGORY_LABEL[k]}
          </span>
        ))}
      </div>

      {!apiKey && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-sm text-amber-900">
          <p className="font-medium">Enable the live map</p>
          <p className="mt-1 text-amber-900/90">
            Add <code className="rounded bg-white px-1.5 py-0.5 text-xs text-amber-950">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in
            your environment (Maps JavaScript API enabled). Until then, use the list and Open in Google Maps below.
          </p>
        </div>
      )}

      {apiKey && (
        <div
          ref={containerRef}
          className="mt-4 h-[min(420px,55vh)] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
          role="presentation"
        />
      )}

      {loadError && (
        <p className="mt-3 text-sm text-rose-600" role="alert">
          {loadError}
        </p>
      )}

      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {mapData.pois.map((p) => (
          <li
            key={`${p.label}-${p.lat}-${p.lng}`}
            className="flex gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2 text-sm text-slate-800"
          >
            <span
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: CATEGORY_HEX[p.category] }}
            />
            <span>
              <span className="font-medium text-slate-900">{p.label}</span>
              <span className="block text-[11px] uppercase tracking-wide text-slate-500">
                {MAP_POI_CATEGORY_LABEL[p.category]}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => openMapsAt(mapData.center.lat, mapData.center.lng)}
          className="inline-flex items-center justify-center rounded-full border border-teal-700 bg-teal-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-teal-800"
        >
          Open in Google Maps
        </button>
      </div>
    </section>
  );
}
