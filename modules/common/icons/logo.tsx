import React from "react";

const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="563"
      height="537"
      viewBox="0 0 563 537"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_220_3241)">
        <path
          d="M274.7 55.6C276.7 99.76 280.97 169.873 287.51 265.94L478.7 361.73L562.84 304.94L364.36 213.24L357.04 0L274.7 55.6Z"
          fill="#05D9C6"
        />
        <path
          d="M33.76 218.16L0 240.94C9.54 234.513 23.1367 235.33 40.79 243.39L208.79 318.26L219.59 536.64L303.7 479.88C299.84 429.74 294.27 358.553 286.99 266.32L96.13 176.07L33.76 218.16Z"
          fill="#3602B3"
        />
      </g>
      <defs>
        <clipPath id="clip0_220_3241">
          <rect width="562.83" height="536.64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Logo;
