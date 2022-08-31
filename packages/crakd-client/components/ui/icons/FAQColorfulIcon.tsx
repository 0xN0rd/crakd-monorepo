import React, { FC } from 'react';

interface FAQColorfulIconProps {
  width?: string;
  color?: string;
}

const FAQColorfulIcon: FC<FAQColorfulIconProps> = ({ width }) => {
  const DEFAULT_WIDTH = '30';

  return (
    <svg width={width || DEFAULT_WIDTH} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <g data-name="Layer 2">
        <g data-name="Layer 1">
        <path
          d="M3 3H11V5H3V17H11V5H13V17H21V5H13V3H21H23V5V17V19H21H13V21H11V19H3H1V17V5V3H3ZM19 10H15V12H19V10ZM15 7H19V9H15V7ZM17 13H15V15H17V13Z"
          fill="#13ff8199"
        />
        </g>
      </g>
    </svg>
  );
};

export default FAQColorfulIcon;