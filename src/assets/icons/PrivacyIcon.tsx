import React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import IIcon from '../../types/icon';

const PrivacyIcon: React.FC<IIcon> = ({ width = 24, height = 24 }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <G clipPath="url(#clip0_19_2492)">
        <Path
          d="M12 0c.832 0 1.5.668 1.5 1.5v9.75s0 .75.75.75.75-.75.75-.75V4.5c0-.832.668-1.5 1.5-1.5s1.5.668 1.5 1.5v12.75c0 .75.75.75.75.75l2.69-2.56a1.512 1.512 0 011.078-.458c1.623.13 1.716 1.905 1.043 2.579l-4.5 4.5C18 23.25 16.424 23.994 15 24H6c-4.5 0-4.5-4.5-4.5-4.5v-12C1.5 6.668 2.168 6 3 6s1.5.668 1.5 1.5v5.25s0 .75.75.75.75-.75.75-.75V3c0-.832.668-1.5 1.5-1.5S9 2.168 9 3v8.25s0 .75.75.75.75-.75.75-.75V1.5c0-.832.668-1.5 1.5-1.5z"
          fill="#FDF9F9"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_19_2492">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};


export default PrivacyIcon;
