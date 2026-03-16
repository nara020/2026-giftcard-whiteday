import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top left, rgba(255,240,244,0.95), transparent 32%), radial-gradient(circle at 78% 18%, rgba(247,233,210,0.7), transparent 20%), linear-gradient(180deg, #fffdfd 0%, #fff7f8 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 34,
            borderRadius: 36,
            border: "1px solid rgba(212,160,165,0.18)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,249,250,0.66))",
            boxShadow: "0 18px 48px rgba(212,160,165,0.10)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 108,
            left: 120,
            width: 118,
            height: 118,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,240,244,0.62) 44%, rgba(244,231,207,0.18) 70%, transparent 76%)",
            filter: "blur(6px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 140,
            left: 150,
            display: "flex",
            width: 58,
            height: 58,
            transform: "rotate(45deg)",
            borderRadius: 10,
            border: "3px solid rgba(212,160,165,0.42)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,245,247,0.72))",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 126,
            right: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(212,160,165,0.68)",
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          2026 Giftcard
        </div>

        <div
          style={{
            position: "absolute",
            left: 120,
            right: 120,
            bottom: 110,
            display: "flex",
            flexDirection: "column",
            color: "#302b2e",
          }}
        >
          <div
            style={{
              fontSize: 28,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: "rgba(212,160,165,0.78)",
              marginBottom: 20,
            }}
          >
            For Jiheun
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 78,
              lineHeight: 1.05,
              fontWeight: 500,
              marginBottom: 18,
            }}
          >
            A thoughtfully
            <br />
            prepared gift
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 28,
              lineHeight: 1.6,
              color: "#8b7f83",
            }}
          >
            Made with sincerity, warmth,
            <br />
            and a heart that does not feel light.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
