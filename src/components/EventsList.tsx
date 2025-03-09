import { StyleSheet, Text, View } from 'react-native';
import EventCard from './EventCard';
import { fonts } from '../constants/fonts';
import SharedButton from './SharedButton';
import IconPlus from '../assets/icons/IconPlus';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useNavigation} from '@react-navigation/native';
import { RootStackNavigation } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { selectTreeData } from '../redux/forest/selectors';
import { deleteEventOperation } from '../redux/forest/operations';

const EventsList = () => {
  const treeData = useAppSelector(selectTreeData);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  const handlePress = () => {
    if (!treeData.id) {
      return;
    }
    navigation.navigate('ADD_EVENT_SCREEN', { treeId: treeData.id });
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (!treeData.id) {
      return;
    }

    try {
      await dispatch(deleteEventOperation({ id: treeData.id, eventId })).unwrap();
      console.log(`Deleted event with ID: ${eventId}`);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      {!treeData.event || treeData.event.length === 0 ? (
        <Text style={styles.noEvents}>You have not yet added events for this tree</Text>
      ) : (
        treeData.event.map((item) => (
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
    backgroundColor: '#252525',
    borderRadius: 12,
  },
  title: {
    color: '#fdf9f9',
    fontFamily: fonts.DMSansRegular,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08,
    marginBottom: 2,
  },
  list: {
    padding: 10,
    gap: 16,
  },
  btnPlus: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: '#C80D0D',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  noEvents: {
    color: '#fdf9f9',
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    opacity: 0.5,
    marginBottom: 8,
  },
});

export default EventsList;
