import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts } from '../constants/fonts';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import TrashIcon from '../assets/icons/TrashIcon copy';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import SharedButton from './SharedButton';
import IGoal from '../types/goal';
import CheckmarkIcon from '../assets/icons/CheckmarkIcon';
import { TDuration } from '../types/duration';
import { colors } from '../constants/colors';

interface IGoalCard {
  goal: IGoal;
  onDelete: () => void;
}

const DELETE_BUTTON_WIDTH = 56;
const SWIPE_THRESHOLD = -DELETE_BUTTON_WIDTH / 2;

const GoalCard: React.FC<IGoalCard> = ({ goal, onDelete }) => {
  const { title, duration } = goal;
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = Math.max(event.translationX, -DELETE_BUTTON_WIDTH);
    })
    .onEnd(() => {
      if (translateX.value < SWIPE_THRESHOLD) {
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const getDeadline = (deadlineDuration: TDuration) => {
    const currentDate = new Date();

    switch (deadlineDuration) {
      case '1 week':
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case '2 weeks':
        currentDate.setDate(currentDate.getDate() + 14);
        break;
      case '1 months':
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      default:
        return 'Deadline absent';
    }

    return currentDate.toISOString().split('T')[0].replaceAll('-', '/');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.deleteContainer}>
        <SharedButton onPress={onDelete}>
          <TrashIcon />
        </SharedButton>
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <View style={styles.textBox}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{`${duration} - until ${getDeadline(duration)}`}</Text>
          </View>
          <CheckmarkIcon />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
    borderColor: colors.red,
    backgroundColor: colors.red,
    borderWidth: 2,
    borderRadius: 16,
  },
  deleteContainer: {
    position: 'absolute',
    right: 0,
    width: DELETE_BUTTON_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    paddingRight: 16,
    gap: 8,
    backgroundColor: '#101010',
    borderRadius: 12,
  },
  textBox: {
    gap: 8,
    width: '80%',
  },
  title: {
    color: colors.lightColor,
    fontFamily: fonts.DMSansBold,
    fontSize: 20,
    lineHeight: 32,
  },
  description: {
    width: 190,
    color: colors.lightColor,
    fontFamily: fonts.DMSansBold,
    fontSize: 12,
    lineHeight: 24,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.red,
    borderRadius: 16,
  },
});

export default GoalCard;

