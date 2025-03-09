import { FlatList, StyleSheet, Text } from 'react-native';
import GoalLayout from '../components/SharedLayout/GoalLayout';
import { fonts } from '../constants/fonts';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectGoals } from '../redux/goals/selectors';
import { useEffect, useRef } from 'react';
import IGoal from '../types/goal';
import GoalCard from '../components/GoalCard';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigation } from '../navigation/types';
import { deleteGoalOperation, fetchGoals } from '../redux/goals/operations';

const GoalsScreen = () => {
  const goals = useAppSelector(selectGoals);
  const flatListRef = useRef<FlatList<IGoal>>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();
  const dispatch = useAppDispatch();
  const showArrow = goals.length !== 0;

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const handleOpen = () => {
    navigation.navigate('ADD_GOAL_SCREEN');
  };

  const handleDelete = (goalId: number) => {
    dispatch(deleteGoalOperation(goalId));
  };

  return (
    <GoalLayout
      isGoalPage={true}
      title={'Woodbine Goals'}
      onPress={handleOpen}
      showArrow={showArrow}
    >
      {!goals.length ? (
        <Text style={styles.text}>You haven't added goals before - create the first one</Text>
      ) : (
        <FlatList
          ref={flatListRef}
          data={goals}
          scrollEnabled
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <GoalCard
              goal={item}
              onDelete={() => handleDelete(item.id)}
             />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </GoalLayout>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  text: {
    color: '#fdf9f9',
    fontFamily: fonts.DMSansRegular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  list: {
    gap: 16,
    marginTop: 16,
  },
});

export default GoalsScreen;
