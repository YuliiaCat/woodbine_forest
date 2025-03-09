import React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import IIcon from '../../types/icon';

const SettingsIcon: React.FC<IIcon> = ({ width = 24, height = 24, fill }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <G clipPath="url(#clip0_84_694)">
        <Path
          d="M21.525 10.8a9.553 9.553 0 00-1.941-4.686l1.75-1.75-1.697-1.698-1.75 1.75A9.552 9.552 0 0013.2 2.476V0h-2.4v2.475a9.553 9.553 0 00-4.686 1.942l-1.75-1.75-1.698 1.696 1.75 1.75A9.552 9.552 0 002.475 10.8H0v2.4h2.475a9.553 9.553 0 001.942 4.686l-1.75 1.75 1.696 1.698 1.75-1.75a9.553 9.553 0 004.687 1.942V24h2.4v-2.475a9.552 9.552 0 004.687-1.942l1.75 1.75 1.697-1.696-1.75-1.75a9.553 9.553 0 001.942-4.687H24v-2.4h-2.475zM12 17.6a5.6 5.6 0 110-11.2 5.6 5.6 0 010 11.2z"
          fill={fill}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_84_694">
          <Path fill={fill} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};


export default SettingsIcon;
