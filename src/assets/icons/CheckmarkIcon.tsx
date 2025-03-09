import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IIcon from '../../types/icon';

const CheckmarkIcon: React.FC<IIcon> = ({ width = 32, height = 32 }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
    >
      <Path
        d="M16 29.333c7.333 0 13.333-6 13.333-13.333S23.333 2.667 16 2.667 2.667 8.667 2.667 16s6 13.333 13.333 13.333z"
        stroke="#FDF9F9"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.333 16l3.774 3.773 7.56-7.546"
        stroke="#FDF9F9"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};


export default CheckmarkIcon;
