import { StyleSheet, Text, View } from 'react-native';
import BackButton from './BackButton';
import SharedButton from './SharedButton';
import { fonts } from '../constants/fonts';
import React from 'react';
import { colors } from '../constants/colors';

interface IShareButtonBlock {
  onPress?: () => void;
  text: string;
  isDisabled?: boolean;
  onBackPress?: () => void;
}

const SharedButtonBlock: React.FC<IShareButtonBlock> = ({ onPress, text, isDisabled, onBackPress }) => {
  return (
    <View style={styles.btnContainer}>
      <BackButton onPress={onBackPress} />
      <SharedButton
        onPress={onPress}
      >
        <Text style={[styles.btnText, !isDisabled && styles.btnActive]}>{text}</Text>
      </SharedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  btnText: {
    color: colors.lightColor,
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    opacity: 0.5,
  },
  btnActive: {
    opacity: 1,
  },
});

export default SharedButtonBlock;
