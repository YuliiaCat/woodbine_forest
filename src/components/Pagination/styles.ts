import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  activeDot: {
    backgroundColor: '#FDF9F9',
  },
  inactiveDot: {
    backgroundColor: '#5F5C6B',
  },
});

export default styles;
