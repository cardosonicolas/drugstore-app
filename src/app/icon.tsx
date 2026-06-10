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
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="11"
            y="17"
            textAnchor="middle"
            fill="white"
            fontSize="16"
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
