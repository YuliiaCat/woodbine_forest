import { StyleSheet, View } from 'react-native';
import EventCard from './EventCard';
import SharedButton from './SharedButton';
import IconPlus from '../assets/icons/IconPlus';
import { useAppDispatch } from '../redux/hooks';
import { useNavigation} from '@react-navigation/native';
import { RootStackNavigation } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../constants/colors';
import SharedTextFS from './SharedComponents/SharedTextFS';
import React from 'react';
import ITree from '../types/tree';
import { updateTreeData } from '../redux/forest/operations';

interface IEventsList {
  tree: ITree;
}

const EventsList: React.FC<IEventsList> = ({ tree }) => {
  const { events } = tree;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  const handlePress = () => {
    if (!tree.id) {
      return;
    }

    navigation.navigate('ADD_EVENT_SCREEN', {
      treeId: tree.id,
    });
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (!tree.id) {
      return;
    }

    try {
      const updatedEvents = tree.events?.filter(event => event.eventId !== eventId) || [];

      await dispatch(updateTreeData({ id: tree.id, events: updatedEvents })).unwrap();
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  return (
    <View style={styles.container}>
      <SharedTextFS
        text={'Events'}
        fontSize13={true}
      />
      {!events?.length ? (
        <SharedTextFS
          text={'You have not yet added events for this tree'}
          style={styles.text}
        />
      ) : (
        events?.map((item) => (
          <View key={item.eventId}>
            <EventCard
              description={item.description}
              date={item.date ? new Date(item.date) : new Date()}
              onDelete={() => handleDeleteEvent(item.eventId)}
            />
          </View>
        ))
      )}

      <SharedButton
        onPress={handlePress}
        styles={styles.btnPlus}
      >
        <IconPlus fill={'#fdf9f9'} isRedButton={true} />
      </SharedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 9,
    paddingHorizontal: 10,
    backgroundColor: colors.inputColor,
    borderRadius: 12,
    gap: 2,
  },
  list: {
    padding: 10,
    gap: 16,
  },
  btnPlus: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    opacity: 0.5,
  },
});

export default EventsList;
