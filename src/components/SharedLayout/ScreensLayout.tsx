import React, { ReactNode } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { fonts } from '../../constants/fonts';
import BackButton from '../BackButton';
import SharedButton from '../SharedButton';
import Title from '../Title';

interface IScreensLayout {
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  isDisabled?: boolean;
  title: string;
  btnText: string;
}

const ScreensLayout: React.FC<IScreensLayout> = ({ children, onNext, onBack, isDisabled, title, btnText }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({android: 20, ios: 90})}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View>
            <View style={styles.btnContainer}>
              <BackButton onPress={onBack} />
              <SharedButton
                onPress={onNext}
                disabled={isDisabled}
              >
                <Text style={[styles.text, !isDisabled && styles.btnActive]}>{btnText}</Text>
              </SharedButton>
            </View>
            <Title title={title} />
          </View>
          <View style={styles.content}>
            {children}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {
    color: '#FDF9F9',
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    opacity: 0.5,
  },
  btnActive: {
    opacity: 1,
  },
    content: {
      gap: 10,
  },
});

export default ScreensLayout;
