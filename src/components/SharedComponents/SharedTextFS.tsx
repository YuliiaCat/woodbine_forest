import { StyleSheet, Text } from 'react-native';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';

interface ISharedTextFS {
  fontSize13?: boolean;
  text?: string;
}

const SharedTextFS: React.FC<ISharedTextFS> = ({ fontSize13, text }) => {
  return (
    <Text style={[styles.text, fontSize13 ? styles.text13 : styles.text17]}>{text}</Text>
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
});

export default SharedTextFS;
