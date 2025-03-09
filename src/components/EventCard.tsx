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

interface IEventCard {
  description: string;
  date: Date;
  onDelete: () => void;
}

const DELETE_BUTTON_WIDTH = 60;
const SWIPE_THRESHOLD = -DELETE_BUTTON_WIDTH / 2;

const EventCard: React.FC<IEventCard> = ({ description, date, onDelete }) => {
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

  return (
    <View style={styles.wrapper}>
      <View style={styles.deleteContainer}>
        <SharedButton onPress={onDelete}>
          <TrashIcon />
        </SharedButton>
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <Text style={[styles.description, styles.descrBox]}>
            {description ?? 'Watered the tree with your friends'}
          </Text>
          <View style={styles.descrBox}>
            <Text style={styles.title}>Date of Event</Text>
            <Text style={styles.description}>{date.toLocaleDateString().replaceAll('/', '-')}</Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // overflow: 'hidden',
    // width: '100%',
    // marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
    borderRadius: 16,
  },
  deleteContainer: {
    position: 'absolute',
    right: 0,
    width: DELETE_BUTTON_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C80D0D',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  container: {
    flex: 1,
    padding: 8,
    gap: 8,
    backgroundColor: '#101010',
    borderRadius: 12,
  },
  description: {
    color: '#fdf9f9',
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  descrBox: {
    backgroundColor: '#252525',
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 10,
  },
  title: {
    color: '#fdf9f9',
    fontFamily: fonts.DMSansRegular,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08,
    marginBottom: 2,
  },
});

export default EventCard;
