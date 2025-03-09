import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ILinearGradient{
  styles?: StyleProp<ViewStyle>;
  colors: string[];
  locations: number[];
  start: { x: number, y: number };
  end: { x: number, y: number };
  children?: ReactNode;
}

const LinearGradientComponent: React.FC<ILinearGradient> = ({ styles, colors, locations, start, end, children}) => {
  return (
    <LinearGradient
      colors={colors}
      locations={locations}
      start={start}
      end={end}
      style={styles}
    >
      {children}
    </LinearGradient>
  );
};

export default LinearGradientComponent;
