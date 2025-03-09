import React from 'react';
import { StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import { fonts } from '../constants/fonts';

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
    backgroundColor: '#252525',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  text: {
    color: '#fdf9f9',
    fontFamily: fonts.DMSansRegular,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  input: {
    color: '#fdf9f9',
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
});

export default SharedInput;
