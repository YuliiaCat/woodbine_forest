import { Image, ImageStyle, StyleProp } from 'react-native';
import React from 'react';

interface TTreeImage {
  style?: StyleProp<ImageStyle>,
  source: any,
}

const TreeImage: React.FC<TTreeImage> = ({ style, source }) => {
  return (
    <Image
      style={style}
      source={source}
      resizeMode="cover"
    />
  );
};

export default TreeImage;
