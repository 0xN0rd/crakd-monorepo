import React, { FC } from 'react';

interface TournamentColorfulIconProps {
  width?: string;
  color?: string;
}

const TournamentColorfulIcon: FC<TournamentColorfulIconProps> = ({ width }) => {
  const DEFAULT_WIDTH = '30';

  return (
    <svg width={width || DEFAULT_WIDTH} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <g data-name="Layer 2">
        <g data-name="Layer 1">
        <path
          d="M9 2H2V4H7V8H2V10H9V8V7H14V17H9V16V14H2V16H7V20H2V22H9V20V19H16V17V13H22V11H16V7V5H9V4V2Z"
          fill="#e9a944"
        />
        </g>
      </g>
    </svg>
  );
};

export default TournamentColorfulIcon;