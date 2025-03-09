import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { fonts } from '../constants/fonts';

interface IText {
  text: string;
  style?: StyleProp<TextStyle>;
}

const SharedText: React.FC<IText> = ({ text, style }) => {
  return (
    <Text style={[style, styles.text]}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    opacity: 0.5,
  },
});

export default SharedText;
