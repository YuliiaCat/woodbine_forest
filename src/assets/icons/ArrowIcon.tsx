import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IIcon from '../../types/icon';

const ArrowIcon: React.FC<IIcon> = ({ width = 18, height = 24, fill}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 10 18"
      fill="none"
    >
      <Path
        d="M0 9c0 .342.127.635.4.889l7.598 7.441c.215.215.488.332.81.332.645 0 1.163-.508 1.163-1.162 0-.322-.137-.605-.352-.83L2.773 9 9.62 2.33a1.21 1.21 0 00.352-.83C9.97.846 9.453.338 8.809.338c-.323 0-.596.117-.81.332L.399 8.102C.127 8.365 0 8.658 0 9z"
        fill={fill}
      />
    </Svg>
  );
};


export default ArrowIcon;
