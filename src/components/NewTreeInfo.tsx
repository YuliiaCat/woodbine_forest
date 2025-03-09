import { StyleSheet, Text, View } from 'react-native';
import { fonts } from '../constants/fonts';
import React from 'react';

interface INewTreeInfo {
  text: string;
  value: string;
}

const NewTreeInfo: React.FC<INewTreeInfo> = ({ text, value }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: '#252525',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  text: {
    color: '#fdf9f9',
    fontFamily: fonts.DMSansRegular,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  value: {
    color: '#fdf9f9',
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
});

export default NewTreeInfo;
