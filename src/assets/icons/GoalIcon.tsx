import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IIcon from '../../types/icon';

const GoalIcon: React.FC<IIcon> = ({ width = 24, height = 24, fill }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
    >
    <Path
      d="M23 4.5h-.75v5.25c0 .45-.3.75-.75.75s-.75-.3-.75-.75V3c0-.45-.3-.75-.75-.75h-7.5c-.45 0-.75.3-.75.75v10.2L3.95 21h-1.2c-.45 0-.75.3-.75.75s.3.75.75.75h19.5c.45 0 .75-.3.75-.75s-.3-.75-.75-.75h-1.2l-7.8-7.8v-2.7h4.05l-1.425.825c-.3.15-.45.525-.3.825.075.3.375.525.75.525h6.75c.45 0 .75-.3.75-.75V5.25C23.75 4.8 23.45 4.5 23 4.5zm-8.025 12.525a6.303 6.303 0 01-4.95 0L12.5 14.55l2.475 2.475z"
      fill={fill}
    />
    </Svg>
  );
};


export default GoalIcon;
