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
      viewBox="0 0 470.586 470.586"
    >
      <path d="M327.081 0H90.234C74.331 0 61.381 12.959 61.381 28.859v412.863c0 15.924 12.95 28.863 28.853 28.863H380.35c15.917 0 28.855-12.939 28.855-28.863V89.234L327.081 0zm6.81 43.184l35.996 39.121h-35.996V43.184zm51.081 398.539c0 2.542-2.081 4.629-4.635 4.629H90.234c-2.55 0-4.619-2.087-4.619-4.629V28.859a4.616 4.616 0 014.619-4.613h219.411v70.181c0 6.682 5.443 12.099 12.129 12.099h63.198v335.197zM128.364 128.89H334.15a9.08 9.08 0 019.079 9.079 9.08 9.08 0 01-9.079 9.079H128.364c-5.012 0-9.079-4.066-9.079-9.079 0-5.012 4.067-9.079 9.079-9.079zm214.865 70.09c0 5.012-4.066 9.079-9.079 9.079H128.364c-5.012 0-9.079-4.066-9.079-9.079s4.067-9.079 9.079-9.079H334.15c5.013 0 9.079 4.067 9.079 9.079zm0 59.013a9.08 9.08 0 01-9.079 9.079H128.364c-5.012 0-9.079-4.066-9.079-9.079s4.067-9.079 9.079-9.079H334.15a9.08 9.08 0 019.079 9.079zm0 60.018a9.08 9.08 0 01-9.079 9.079H128.364c-5.012 0-9.079-4.066-9.079-9.079s4.067-9.079 9.079-9.079H334.15a9.08 9.08 0 019.079 9.079z" />
    </svg>
  );
};

export default TournamentIcon;
