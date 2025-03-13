import { useNavigation, useRoute } from '@react-navigation/native';
import ScreensLayout from '../components/SharedLayout/ScreensLayout';
import { AddEventScreenNavigationProp, NavigationProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectForest } from '../redux/forest/selectors';
import { useState } from 'react';
import IEvent from '../types/event';
import { TouchableOpacity } from 'react-native';
import SharedText from '../components/SharedText';
import SharedInput from '../components/SharedInput';
import DatePickerComponent from '../components/DatePickerComponent';
import { updateTreeData } from '../redux/forest/operations';

const AddEventScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<AddEventScreenNavigationProp['route']>();
  const { treeId } = route.params;
  const dispatch = useAppDispatch();
  const trees = useAppSelector(selectForest);
  const tree = trees.find(t => t.id === treeId) ?? null;
  const [showCalendar, setShowCalendar] = useState(false);
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState<Date | null>(null);

  const handleInputChange = (key: keyof IEvent, value: string | Date | null) => {
    if (!tree) {
      return;
    }

    if (key === 'description') {
      setEventDescription(value as string);
    } else if (key === 'date' && value instanceof Date) {
      setEventDate(value);
    }
  };

  const handleAddEvent = () => {
    if (!tree) {
      return;
    }

    if (!eventDescription.trim()) {
      console.warn('Cannot add an empty event!');
      return;
    }

    const newEvent: IEvent = {
      eventId: Date.now(),
      description: eventDescription,
      date: eventDate ? eventDate.toISOString() : new Date().toISOString(),
    };

    const updatedTree = {
      ...tree,
      events: [...(tree.events || []), newEvent],
    };

    dispatch(updateTreeData(updatedTree));

    setEventDescription('');
    setEventDate(null);

    navigation.navigate('MAIN_SCREEN');
  };

  return (
    <ScreensLayout
      title={'Add event'}
      btnText={'Add'}
      onNext={handleAddEvent}
    >
      <SharedText text={'Event info'}  />
       <SharedInput
          text={'Tell me what you were doing. For example, transplanted the tree, watered the tree, added fertilizer, etc.'}
          placeholder={'Enter description'}
          value={eventDescription}
          onChange={(text) => handleInputChange('description', text)}
       />

      {!showCalendar ? (
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <SharedInput
            text={'Enter date of event'}
            placeholder={'-'}
            value={
              eventDate
                ? eventDate.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })
                : ''
            }
            editable={false}
          />
        </TouchableOpacity>
        ) : (
          <DatePickerComponent
            selectedDate={eventDate || new Date()}
            onSelectDate={(date) => {
              handleInputChange('date', date);
              setShowCalendar(false);
            }}
          />
        )}
    </ScreensLayout>
  );
};

export default AddEventScreen;
