import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#EB4544",
          borderRadius: 6,
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          EP
        </span>
      </div>
    ),
    {
      ...size,
    },
  );
}
