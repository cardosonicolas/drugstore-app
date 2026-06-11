import { ImageResponse } from "next/og";

export const alt = "Drugstore El Paracao | Delivery 24 hs en Paraná";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FEFEFE",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              backgroundColor: "#EB4544",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 24,
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: 30,
                fontWeight: 700,
                fontFamily: "sans-serif",
                lineHeight: 1,
              }}
            >
              EP
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "#1a1a1a",
                lineHeight: 1.1,
              }}
            >
              Drugstore El Paracao
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 28,
              color: "#EB4544",
              fontWeight: 600,
            }}
          >
            Delivery 24 hs en Paraná, Entre Ríos
          </span>
          <span
            style={{
              fontSize: 22,
              color: "#555",
              maxWidth: 900,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Bebidas · Snacks · Chocolates · Cigarrillos · Despensa
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
