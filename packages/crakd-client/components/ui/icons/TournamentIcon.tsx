import React, { FC } from 'react';
import theme from '../../../theme';
import get from 'lodash/get';

interface TournamentIconProps {
  width?: string;
  color?: string;
}

const TournamentIcon: FC<TournamentIconProps> = ({ width, color }) => {
  const DEFAULT_WIDTH = '18';
  const DEFAULT_COLOR = theme.colors.general.textSecondary;

  return (
    <svg
      width={width || DEFAULT_WIDTH}
      fill={get(theme.colors.general, color) || DEFAULT_COLOR}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M9 2H2V4H7V8H2V10H9V8V7H14V17H9V16V14H2V16H7V20H2V22H9V20V19H16V17V13H22V11H16V7V5H9V4V2Z" />
    </svg>
  );
};

export default TournamentIcon;
