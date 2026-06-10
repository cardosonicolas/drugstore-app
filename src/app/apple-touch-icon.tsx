import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleTouchIcon() {
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
          borderRadius: 36,
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="60"
            y="82"
            textAnchor="middle"
            fill="white"
            fontSize="72"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            EP
          </text>
        </svg>
      </div>
    ),
    {
      ...size,
    },
  );
}
