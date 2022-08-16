import React, { FC } from 'react';
import theme from '../../../theme';

interface MenuIconProps {
  width?: string;
  color?: string;
}

const MenuIcon: FC<MenuIconProps> = ({ width, color }) => {
  const DEFAULT_WIDTH = '30';
  const DEFAULT_COLOR = theme.colors.general.textSecondary;

  return (
    <svg
      width={width || DEFAULT_WIDTH}
      fill={theme.colors.general[color] || DEFAULT_COLOR}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
    >
      <path
        fill="#5c5c5e"
        d="M14 3.99999V1.99999H9.99999V3.99999H5.00018V5.99999H19.0002V3.99999H14ZM18.9999 16H4.99994V12H2.99994V16V18L7.99975 18V22H9.99975V18H13.9998V20H10V22H13.9998V22H15.9998V18L20.9999 18V16L21 12H19V5.99999H17V14H18.9999V16ZM5.00018 5.99999V14H7.00018V5.99999H5.00018Z"
      />
    </svg>
  );
};

export default MenuIcon;
