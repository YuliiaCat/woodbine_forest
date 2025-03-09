import GoalLayout from '../components/SharedLayout/GoalLayout';
import Title from '../components/Title';
import AddButton from '../components/AddButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigation } from '../navigation/types';

const SuccessScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  const handlePress = () => {
    navigation.navigate('SETTINGS_SCREEN');
  };

  return (
    <GoalLayout isAddGoal={true}>
      <Title title={'Success!'} />
      <AddButton
        onPress={handlePress}
        text={'Back to menu'}
      />
    </GoalLayout>
  );
};

export default SuccessScreen;
