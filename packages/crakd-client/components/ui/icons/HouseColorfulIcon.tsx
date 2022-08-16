import React, { FC } from 'react';

interface HouseColorfulIconProps {
  width?: string;
  color?: string;
}

const HouseColorfulIcon: FC<HouseColorfulIconProps> = ({ width }) => {
  const DEFAULT_WIDTH = '30';

  return (
    <svg width={width || DEFAULT_WIDTH} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <g data-name="Layer 2">
        <g data-name="Layer 1">
        <path
          d="M14 2H10V4H8V6H6V8H4V10H2V12H4V22H11V16H13V22H20V12H22V10H20V8H18V6H16V4H14V2ZM14 4V6H16V8H18V10H20V12H18V20H15V14H9V20H6V12H4V10H6V8H8V6H10V4H14Z"
          fill="#0084ff"
        />
        </g>
      </g>
    </svg>
  );
};

export default HouseColorfulIcon;
