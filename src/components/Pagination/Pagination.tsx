import React from 'react';
import styles from './styles';
import { View } from 'react-native';
import IonBoardingItem from '../../types/onboarding';

interface IPagination {
  data: IonBoardingItem[];
  currentIndex: number;
}

const Pagination: React.FC<IPagination> = ({ data, currentIndex }) => {
  return (
    <View style={styles.container}>
      {data.map((_, index) => {
        return (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;
