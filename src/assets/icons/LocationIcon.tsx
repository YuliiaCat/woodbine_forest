import React from 'react';
import Svg, { Path } from 'react-native-svg';
import IIcon from '../../types/icon';

const LocationIcon: React.FC<IIcon> = ({ width = 9, height = 12, fill }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 9 12"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5.313A4.063 4.063 0 00.437 4.375c0 .926.455 2.021 1.12 3.196.671 1.19 1.598 2.525 2.612 3.947l.331.463.33-.463C5.847 10.096 6.773 8.76 7.445 7.57c.663-1.175 1.119-2.27 1.119-3.196A4.062 4.062 0 004.5.312zm0 2.03a2.031 2.031 0 100 4.063 2.031 2.031 0 000-4.062z"
        fill={fill}
      />
    </Svg>
  );
};


export default LocationIcon;
