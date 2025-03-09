import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    borderRadius: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: 'space-evenly',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C80D0D',
  },
  btnPlus: {
    backgroundColor: '#C80D0D',
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
