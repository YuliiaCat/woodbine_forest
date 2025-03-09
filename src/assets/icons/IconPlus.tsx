import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import IIcon from '../../types/icon';

const IconPlus: React.FC<IIcon> = ({ width = 24, height = 24, fill, isRedButton }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
    >
      {isRedButton ? (
        <Path
        d="M12.337 2.225v20.224M2.225 12.337h20.224"
        stroke="#FDF9F9"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      ) : (
        <>
          <Rect x={10} width={4} height={24} rx={2} fill={fill} />
          <Rect
            y={14}
            width={4}
            height={24}
            rx={2}
            transform="rotate(-90 0 14)"
            fill={fill}
          />
        </>
      )}

    </Svg>
  );
};


export default IconPlus;
