import React, { FC } from 'react';

interface CheckColorfulIconProps {
  width?: string;
  color?: string;
}

const CheckColorfulIcon: FC<CheckColorfulIconProps> = ({ width }) => {
  const DEFAULT_WIDTH = '30';

  return (
    <svg width={width || DEFAULT_WIDTH} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <g data-name="Layer 2">
        <g data-name="Layer 1">
        <path
          d="M18 6H20V8H18V6ZM16 10V8H18V10H16ZM14 12V10H16V12H14ZM12 14H14V12H12V14ZM10 16H12V14H10V16ZM8 16V18H10V16H8ZM6 14H8V16H6V14ZM6 14H4V12H6V14Z"
          fill="#ff0080"
        />
        </g>
      </g>
    </svg>
  );
};

export default CheckColorfulIcon;