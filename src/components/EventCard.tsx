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
import { colors } from '../constants/colors';
import SharedTextFS from './SharedComponents/SharedTextFS';

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
            {description ?? ''}
          </Text>
          <View style={styles.descrBox}>
            <SharedTextFS
              text={'Date of Event'}
              fontSize13={true}
            />
            <SharedTextFS
              text={date.toLocaleDateString().replaceAll('/', '-')}
            />
          </View>
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
    padding: 8,
    gap: 8,
    backgroundColor: colors.treeCardColor,
    borderRadius: 12,
  },
  description: {
    color: colors.lightColor,
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  descrBox: {
    backgroundColor: colors.inputColor,
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 10,
  },
});

export default EventCard;
