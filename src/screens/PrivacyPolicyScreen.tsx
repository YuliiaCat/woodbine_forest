import { ScrollView, StyleSheet, View } from 'react-native';
import BackButton from '../components/BackButton';
import Title from '../components/Title';
import { colors } from '../constants/colors';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container} >
      <BackButton />
      <Title title={'Privacy Policy'} />
      <View style={styles.content} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 8,
  },
  title: {
    marginBottom: 8,
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 16,
    marginTop: 8,
  },
});

export default PrivacyPolicyScreen;
