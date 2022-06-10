import React from 'react';

export const Loader = (): JSX.Element => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
    <circle fill="#bababa" stroke="none" cx="4" cy="4" r="4">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.1"
      />
    </circle>
    <circle fill="#bababa" stroke="none" cx="28" cy="4" r="4">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.2"
      />
    </circle>
    <circle fill="#bababa" stroke="none" cx="52" cy="4" r="4">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.3"
      />
    </circle>
  </svg>
);
