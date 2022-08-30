import React, { FC } from 'react';
import theme from '../../../theme';

interface RulesIconProps {
  width?: string;
  color?: string;
}

const RulesIcon: FC<RulesIconProps> = ({ width, color }) => {
  const DEFAULT_WIDTH = '18';
  const DEFAULT_COLOR = theme.colors.general.textSecondary;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width || DEFAULT_WIDTH}>
      <path
        d="M6 3H20V5H22V11H20V19H18V5H6V3ZM14 17V15H6V5H4V15H2V17V19H4V21H18V19H16V17H14ZM14 17V19H4V17H14ZM8 7H16V9H8V7ZM16 11H8V13H16V11Z"
        fill={theme.colors[color] || DEFAULT_COLOR}
      />
    </svg>
  );
};

export default RulesIcon;