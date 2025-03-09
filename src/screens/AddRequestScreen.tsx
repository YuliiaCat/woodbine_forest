import { Alert, StyleSheet, View } from 'react-native';
import GoalLayout from '../components/SharedLayout/GoalLayout';
import SharedButtonBlock from '../components/SharedButtonBlock';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigation } from '../navigation/types';
import Title from '../components/Title';
import SharedText from '../components/SharedText';
import SharedInput from '../components/SharedInput';
import sendEmail from 'react-native-email';
import { useState } from 'react';

const AddRequestScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const isDisabled = !name || !email || !message;

  const handleSendEmail = () => {
    if (isDisabled) {
      Alert.alert('Error', 'Please fill in all fields before sending.');
      return;
    }

    const subject = 'Request to Add a New Tree';
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    sendEmail('kotyuliya24@gmail.com', {
      subject,
      body,
      checkCanOpen: false,
    }).catch((error) => console.error('Email error:', error));

    navigation.navigate('SUCCESS_SCREEN');
  };

  return (
    <GoalLayout isAddGoal={true}>
      <View style={styles.container}>
        <SharedButtonBlock
          onPress={handleSendEmail}
          text={'Send'}
          isDisabled={isDisabled}
          onBackPress={() => navigation.goBack()}
        />
        <Title title={'Request to add a new tree'} />
        <View style={styles.contentBox}>
          <SharedText text={'Your info'} style={styles.subTitle} />
          <SharedInput
            text={'Your name'}
            placeholder={'Enter your name'}
            value={name}
            onChange={(text) => setName(text)}
          />
          <SharedInput
            text={'Your email'}
            placeholder={'Enter your email'}
            value={email.toLowerCase()}
            onChange={(text) => setEmail(text)}
          />
          <SharedInput
            text={'Description'}
            placeholder={'Enter message for tree'}
            value={message}
            onChange={(text) => setMessage(text)}
          />
        </View>
      </View>
    </GoalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  contentBox: {
    gap: 10,
  },
  subTitle: {
    color: '#fdf9f9',
    marginTop: 8,
  },
});

export default AddRequestScreen;
