import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TTreeCategory } from '../types/treeCategory';
import { fonts } from '../constants/fonts';

interface IFilterDropdown {
  categories: TTreeCategory[];
  setSelectedCategory: (category: TTreeCategory) => void;
  setShowDropDown: (value: boolean) => void;
}

const FilterDropdown: React.FC<IFilterDropdown> = ({ categories, setSelectedCategory, setShowDropDown }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  },);

  const animatedStyle = {
    opacity: slideAnim,
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-20, 0],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {categories.map((category: string, index) => (
        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(category as TTreeCategory);
            setShowDropDown(false);
          }}
        >
          <Text style={[index < 3 && styles.category, styles.text]}>{category}</Text>

        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 5,
    top: -42,
    right: 0,
    width: '85%',
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    paddingLeft: 16,
  },
  text: {
    color: '#ffffff',
    textAlign: 'right',
    paddingVertical: 11,
    paddingRight: 16,
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  category: {
    borderBottomColor: '#545458A6',
    borderBottomWidth: 0.5,
  },
});

export default FilterDropdown;
