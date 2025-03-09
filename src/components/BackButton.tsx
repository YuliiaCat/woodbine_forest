import { StyleSheet, Text } from 'react-native';
import ArrowIcon from '../assets/icons/ArrowIcon';
import SharedButton from './SharedButton';
import { fonts } from '../constants/fonts';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

interface IBackButton {
  onPress?: () => void;
}

const BackButton: React.FC<IBackButton> = ({ onPress }) => {
  const navigation = useNavigation();

  return (
    <SharedButton
        onPress={onPress ? onPress : () => navigation.goBack()}
        styles={styles.btnBack}
      >
        <ArrowIcon fill={'#fdf9f9'} />
        <Text style={styles.text}>Back</Text>
    </SharedButton>
  );
};

const styles = StyleSheet.create({
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  text: {
    color: '#FDF9F9',
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
});

export default BackButton;
