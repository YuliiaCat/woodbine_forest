import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { fonts } from '../constants/fonts';

interface Title {
  title?: string;
}

const Title: React.FC<Title> = ({ title }) => {
  return (
    <Text style={styles.title}>{title}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#fdf9f9',
    fontFamily: fonts.DMSansBold,
    fontSize: 32,
  },
});

export default Title;
