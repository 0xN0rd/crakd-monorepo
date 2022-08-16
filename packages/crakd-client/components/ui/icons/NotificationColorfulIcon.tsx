import React, { FC } from 'react';

interface NotificationColorfulIconProps {
  width?: string;
  color?: string;
}

const NotificationColorfulIcon: FC<NotificationColorfulIconProps> = ({ width }) => {
  const DEFAULT_WIDTH = '30';

  return (
    <svg width={width || DEFAULT_WIDTH} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <g id="Group_61" data-name="Group 61">
            <path
              id="Path_106"
              data-name="Path 106"
              fill="#ffd60a"
              d="M14 3.99999V1.99999H9.99999V3.99999H5.00018V5.99999H19.0002V3.99999H14ZM18.9999 16H4.99994V12H2.99994V16V18L7.99975 18V22H9.99975V18H13.9998V20H10V22H13.9998V22H15.9998V18L20.9999 18V16L21 12H19V5.99999H17V14H18.9999V16ZM5.00018 5.99999V14H7.00018V5.99999H5.00018Z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default NotificationColorfulIcon;
