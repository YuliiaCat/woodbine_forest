import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IIcon from '../../types/icon';

const ChevronRight: React.FC<IIcon> = ({ width = 18, height = 24, fill}) => {
  return (
    <Svg
    width={width}
    height={height}
    viewBox="0 0 10 18"
    fill="none"
  >
    <Path
      d="M10 9a1.272 1.272 0 00-.4-.898L2.002.67a1.129 1.129 0 00-.81-.332C.536.338.028.846.028 1.5c0 .313.127.605.352.83L7.217 9 .38 15.67a1.152 1.152 0 00-.352.83c0 .654.508 1.162 1.162 1.162.313 0 .586-.117.81-.332L9.601 9.89c.273-.254.4-.547.4-.889z"
      fill={fill}
    />
  </Svg>
  );
};


export default ChevronRight;
