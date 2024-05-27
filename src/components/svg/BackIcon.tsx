import React from "react";
import { SVGIconProps } from "./svg.types";

const BackIcon = ({
  width = "49px",
  height = "35px",
  color = "black",
  ...otheProps
}: SVGIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      {...otheProps}
      viewBox="0 0 49 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44.6875 14H11.6875L19.6281 5.915C20.3053 5.2255 20.625 4.403 20.625 3.5C20.625 1.778 19.2277 0 17.1875 0C16.2748 0 15.4791 0.33775 14.8156 1.015L1.13781 14.9415C0.574062 15.5155 0 16.2243 0 17.5C0 18.7757 0.479531 19.39 1.11031 20.0323L14.8156 33.985C15.4791 34.6623 16.2748 35 17.1875 35C19.2294 35 20.625 33.222 20.625 31.5C20.625 30.597 20.3053 29.7745 19.6281 29.085L11.6875 21H44.6875C46.585 21 48.125 19.432 48.125 17.5C48.125 15.568 46.585 14 44.6875 14Z"
        fill={color}
      />
    </svg>
  );
};

export default BackIcon;
