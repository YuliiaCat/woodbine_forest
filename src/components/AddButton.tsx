import LinearGradientComponent from './LinearGradientComponent';
import SharedButton from './SharedButton';
import { fonts } from '../constants/fonts';
import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { colors } from '../constants/colors';

interface IAddButton {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
}

const AddButton: React.FC<IAddButton> = ({ onPress, text, style, styleText }) => {
  return (
    <LinearGradientComponent
        colors={['#050505', '#0F0C0C', '#3A0001']}
        styles={[styles.gradient, style]}
        locations={[0, 0.75, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <SharedButton
          styles={styles.btnAdd}
          onPress={onPress}
        >
          <Text style={[styles.btnText, styleText]}>{text}</Text>
        </SharedButton>
      </LinearGradientComponent>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    borderRadius: 16,
    boxShadow: '4px 4px 4px 0px #EE131340',
  },
  btnAdd: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C80D0D',
  },
  btnText: {
    color: colors.white,
    fontFamily: fonts.DMSansRegular,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 21,
    paddingVertical: 10,
  },
});

export default AddButton;
