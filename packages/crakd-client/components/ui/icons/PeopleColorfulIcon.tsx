import React, { FC } from 'react';

interface PeopleColorfulIconProps {
  width?: string;
  color?: string;
}

const PeopleColorfulIcon: FC<PeopleColorfulIconProps> = ({ width }) => {
  const DEFAULT_WIDTH = '30';

  return (
    <svg width={width || DEFAULT_WIDTH} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <g id="Group_60" data-name="Group 60">
          <path
            d="M11 2H5V4H3.00024V10L5 10V12H11V10L5.00024 10V4H11V2ZM11.0002 4H13.0002V10H11.0002V4ZM0 16H2V20H14V22H2H0V16ZM2 16H14V14H2V16ZM16.0002 16H14.0002V22H16.0002V16ZM15 2H19V4H15V2ZM19 10H15V12H19V10ZM19.0002 4H21.0002V10H19.0002V4ZM24.0002 16H22.0002V20H18V22H24V20H24.0002V16ZM18 14H22V16H18V14Z"
            fill="#5e5ce6"
          />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default PeopleColorfulIcon;
