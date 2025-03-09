import { StyleSheet, Text, View } from 'react-native';
import GoalLayout from '../components/SharedLayout/GoalLayout';
import SharedButton from '../components/SharedButton';
import { useState } from 'react';
import { fonts } from '../constants/fonts';
import Title from '../components/Title';
import SharedText from '../components/SharedText';
import SharedInput from '../components/SharedInput';
import { useAppDispatch } from '../redux/hooks';
import { addGoalOperation } from '../redux/goals/operations';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigation } from '../navigation/types';
import { TDuration } from '../types/duration';
import uuid from 'react-native-uuid';
import SharedButtonBlock from '../components/SharedButtonBlock';
import { colors } from '../constants/colors';

const AddGoalScreen = () => {
  const [goalName, setGoalName] = useState('');
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();
  const [selectedDuration, setSelectedDuration] = useState<TDuration>('1 week');
  const durations: TDuration[] = ['1 week', '2 weeks', '1 months'];
  const isDisabled = goalName.trim().length === 0;

  const handleSelectDuration = (duration: TDuration) => {
    setSelectedDuration(duration);
  };

  const handleAddGoal = () => {
    if (isDisabled) {
      return;
    }

    const newGoal = {
      id: Date.now(),
      title: goalName,
      duration: selectedDuration,
    };

    dispatch(addGoalOperation(newGoal));
    navigation.navigate('GOALS_SCREEN');
  };


  return (
    <GoalLayout
      isAddGoal={true}
    >
      <View>
        <SharedButtonBlock
          onPress={handleAddGoal}
          text={'Add'}
          isDisabled={isDisabled}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.content}>
          <Title title={'Add Goal'} />
          <View style={styles.textBox}>
            <SharedText style={styles.text} text={'Goal info'} />
            <SharedInput
              text={'Goal name'}
              value={goalName}
              placeholder={'Enter goal name'}
              onChange={(text) => setGoalName(text)}
            />
            <View style={styles.durationsContainer}>
                <Text style={styles.goalTermText}>Select goal term</Text>
                <View style={styles.durationList}>
                  {durations.map((duration) => (
                    <SharedButton
                      onPress={() => handleSelectDuration(duration)}
                      key={uuid.v4()}
                      styles={[
                        styles.btnDur,
                        selectedDuration === duration && styles.selectedButton,
                       ]}
                    >
                      <Text style={styles.durationText}>{duration}</Text>
                    </SharedButton>
                  ))}
                </View>
            </View>
          </View>
        </View>
      </View>
    </GoalLayout>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  btnText: {
    color: colors.lightColor,
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    opacity: 0.5,
  },
  btnActive: {
    opacity: 1,
  },
  content: {
    gap: 10,
  },
  text: {
    color: colors.lightColor,
  },
  textBox: {
    gap: 10,
  },
  durationsContainer: {
    backgroundColor: colors.inputColor,
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 10,
    gap: 5,
  },
  goalTermText: {
    color: colors.lightColor,
    fontFamily: fonts.DMSansRegular,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  durationList: {
    flexDirection: 'row',
    gap: 8,
  },
  btnDur: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: colors.treeCardColor,
  },
  durationText: {
    color: colors.inputColor,
    fontFamily: fonts.DMSansBold,
    fontSize: 12,
    lineHeight: 24,
  },
  selectedButton: {
    backgroundColor: colors.red,
  },
});

export default AddGoalScreen;
