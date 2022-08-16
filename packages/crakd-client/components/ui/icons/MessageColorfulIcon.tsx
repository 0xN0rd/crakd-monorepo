import React, { FC } from 'react';

interface MessageColorfulIconProps {
  width?: string;
  color?: string;
}

const MessageColorfulIcon: FC<MessageColorfulIconProps> = ({ width }) => {
  const DEFAULT_WIDTH = '30';

  return (
    <svg width={width || DEFAULT_WIDTH} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <g id="Group_62" data-name="Group 62">
            <path
              d="M4 2H20H22V4V16V18H20H6.00025V20H4.00025V18H6V16H20V4H4V22H2V4H2V2H2H4ZM9 9H7V11H9V9ZM11 9H13V11H11V9ZM17 9H15V11H17V9Z"
              fill="#30d158"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default MessageColorfulIcon;
