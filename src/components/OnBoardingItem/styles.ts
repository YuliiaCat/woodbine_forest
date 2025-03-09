import { StyleSheet } from 'react-native';
import { fonts } from '../../constants/fonts';

const styles = StyleSheet.create({
  item: {
    paddingTop: 82,
    paddingHorizontal: 32,
    gap: 52,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    gap: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.DMSansMedium,
    fontSize: 24,
    lineHeight: 24,
    color: '#fdf9f9',
  },
  text: {
    fontFamily: fonts.DMSansRegular,
    fontSize: 16,
    color: '#fdf9f9',
    lineHeight: 24,
    textAlign: 'center',
  },
  image: {
    width: 256,
    height: 256,
  },
});

export default styles;
