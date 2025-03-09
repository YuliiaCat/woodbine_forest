import { StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../constants/colors';
import SharedTextFS from './SharedComponents/SharedTextFS';

interface INewTreeInfo {
  text: string;
  value: string;
}

const NewTreeInfo: React.FC<INewTreeInfo> = ({ text, value }) => {
  return (
    <View style={styles.infoContainer}>
      <SharedTextFS
        text={text}
        fontSize13={true}
      />
      <SharedTextFS text={value} />
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: colors.inputColor,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
});

export default NewTreeInfo;
