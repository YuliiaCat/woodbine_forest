import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IIcon from '../../types/icon';

const ArrowIconRight: React.FC<IIcon> = ({ width = 18, height = 24, fill}) => {
  return (
    <Svg
    width={width}
    height={height}
    viewBox="0 0 12 24"
    fill="none"
  >
    <Path
      d="M2.452 6.58l1.061-1.06 5.779 5.777a.996.996 0 010 1.413l-5.779 5.78-1.06-1.06 5.424-5.425L2.452 6.58z"
      fill={fill}
      opacity={0.5}
    />
  </Svg>
  );
};


export default ArrowIconRight;
