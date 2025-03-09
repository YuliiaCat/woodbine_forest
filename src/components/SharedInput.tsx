import React from 'react';
import { StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import { fonts } from '../constants/fonts';
import { colors } from '../constants/colors';

interface ISharedInput {
  text: string;
  placeholder?: string;
  value: string;
  style?: StyleProp<ViewStyle>;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  editable?: boolean;
}

const SharedInput: React.FC<ISharedInput> = ({ text, placeholder, value, style, onChange, onBlur, editable }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.text}>{text}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'#FDF9F980'}
        value={value}
        onChangeText={onChange}
        style={[styles.input, style]}
        onBlur={onBlur}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors.inputColor,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  text: {
    color: colors.lightColor,
    fontFamily: fonts.DMSansRegular,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  input: {
    color: colors.lightColor,
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
});

export default SharedInput;
