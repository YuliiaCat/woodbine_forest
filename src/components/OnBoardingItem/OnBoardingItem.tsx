import React from 'react';
import IonBoardingItem from '../../types/onboarding';
import { Dimensions, Text, View } from 'react-native';
import styles from './styles';
import TreeImage from '../TreeImage/TreeImage';

const { width } = Dimensions.get('window');

const OnBoardingItem: React.FC<IonBoardingItem> = ({ image, title, text}) => {
  return (
    <View style={[styles.item, { width }]}>
      <TreeImage
        style={styles.image}
        source={image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default OnBoardingItem;
