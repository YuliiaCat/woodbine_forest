import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IIcon from '../../types/icon';

const SearchIcon: React.FC<IIcon> = ({ width = 16, height = 16 }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        d="M10.065 11.185l1.13-1.13L16 14.86l-1.13 1.13-4.805-4.804z"
        fill="#616161"
      />
      <Path
        d="M6.395 0A6.396 6.396 0 000 6.394a6.393 6.393 0 006.395 6.394 6.396 6.396 0 006.396-6.394A6.393 6.393 0 006.394 0z"
        fill="#616161"
      />
      <Path
        d="M11.373 12.524l1.131-1.13 3.476 3.476L14.85 16l-3.476-3.476z"
        fill="#37474F"
      />
      <Path
        d="M6.395 1.199a5.197 5.197 0 00-3.674 8.868A5.197 5.197 0 0010.07 2.72 5.197 5.197 0 006.395 1.2z"
        fill="#64B5F6"
      />
      <Path
        d="M9.153 4.076a3.616 3.616 0 00-5.516 0c-.16.16-.12.44.04.56.16.16.44.12.56-.04.56-.64 1.319-1 2.158-1 .84 0 1.6.36 2.159 1 .08.08.2.16.32.16.08 0 .2-.04.24-.08.16-.16.16-.44.04-.6z"
        fill="#BBDEFB"
      />
    </Svg>
  );
};


export default SearchIcon;
