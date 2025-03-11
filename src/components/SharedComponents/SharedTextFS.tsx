import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';

interface ISharedTextFS {
  fontSize13?: boolean;
  text?: string;
  style?: StyleProp<TextStyle>;
}

const SharedTextFS: React.FC<ISharedTextFS> = ({ fontSize13, text, style }) => {
  return (
    <Text style={[styles.text, style, fontSize13 ? styles.text13 : styles.text17]}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.lightColor,
    fontFamily: fonts.DMSansRegular,
  },
  text17: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  text13: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  text16: {
    color: colors.lightColor,
    fontFamily: fonts.DMSansRegular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default SharedTextFS;
