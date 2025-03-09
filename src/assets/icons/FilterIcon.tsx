import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IIcon from '../../types/icon';

const FilterIcon: React.FC<IIcon> = ({ width = 24, height = 24, fill }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
    <Path
        d="M0 4.5h24v-3H0v3zM3 10.5h18v-3H3v3zM6 16.5h12v-3H6v3zM15 22.5H9v-3h6v3z"
        fill={fill}
      />
    </Svg>
  );
};


export default FilterIcon;
