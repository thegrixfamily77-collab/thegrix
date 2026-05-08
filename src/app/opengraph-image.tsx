import { ImageResponse } from "next/og";

export const alt = "The Grix — Navi Mumbai real estate research";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #0f766e 0%, #134e4a 42%, #1e293b 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: "0.35em", textTransform: "uppercase", opacity: 0.92 }}>
          Research atlas
        </div>
        <div style={{ marginTop: 20, fontSize: 68, fontWeight: 650, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          The Grix
        </div>
        <div style={{ marginTop: 24, fontSize: 30, fontWeight: 500, opacity: 0.94, maxWidth: 860 }}>
          Navi Mumbai real estate — locations, sectors & inventory context
        </div>
      </div>
    ),
    { ...size },
  );
}
