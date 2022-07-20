import React, { SVGProps } from 'react';
import styled from 'styled-components';

export const ArrowCarousel = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 35 54" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#filter0_d_3524_7581)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        // eslint-disable-next-line max-len
        d="M5.18394 22.9203C4.00119 24.0805 4.00119 25.9617 5.18394 27.122L7.61157 29.5035C7.6149 29.5068 7.61823 29.51 7.62157 29.5133L26.7373 48.2658C27.92 49.4261 29.8377 49.4261 31.0204 48.2658L33.4481 45.8843C34.6308 44.724 34.6308 42.8428 33.4481 41.6826L16.4639 25.0211L33.448 8.35972C34.6308 7.19944 34.6308 5.31825 33.448 4.15797L31.0204 1.77646C29.8376 0.616178 27.92 0.616181 26.7372 1.77646L7.61161 20.5388L5.18398 22.9203L5.18394 22.9203Z"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_3524_7581"
        x="0.296875"
        y="0.90625"
        width="34.0391"
        height="52.2305"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-2" dy="2" />
        <feGaussianBlur stdDeviation="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.129167 0 0 0 0 0.129167 0 0 0 0 0.129167 0 0 0 0.3 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3524_7581" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_3524_7581"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const Path = styled.path`
  fill: ${({ theme }) => theme.dynamicTheme.arrowFill};
`;
