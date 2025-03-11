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

  const handleInputChange = (key: keyof IEvent, value: string | Date | null) => {
    if (!tree) {
      return;
    }

    const lastEvent: IEvent = tree.events?.length
      ? { ...tree.events.at(-1)! }
      : { eventId: Date.now(), description: '', date: null };

    const updatedEvent = { ...lastEvent, [key]: value instanceof Date ? value.toISOString() : value };

    const updatedTree = {
      ...tree,
      events: tree.events?.length
        ? [...tree.events.slice(0, -1), updatedEvent]
        : [updatedEvent],
    };

    dispatch(updateTreeData(updatedTree));
  };

  const handleAddEvent = () => {
    if (!tree) {
      return;
    }

    const newEvent: IEvent = {
      eventId: Date.now(),
      description: '',
      date: new Date().toISOString(),
    };

    const updatedTree = {
      ...tree,
      events: [...(tree.events || []), newEvent],
    };

    console.log('updatedTree', updatedTree);

  dispatch(updateTreeData(updatedTree));
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
          value={tree?.events?.at(-1)?.description || ''}
          onChange={(text) => handleInputChange('description', text)}
       />

      {!showCalendar ? (
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <SharedInput
            text={'Enter date of event'}
            placeholder={'-'}
            value={
              tree?.events?.at(-1)?.date
                ? new Date(tree.events.at(-1)!.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  }).replaceAll('/', '-')
                : ''
            }
            editable={false}
          />
        </TouchableOpacity>
        ) : (
          <DatePickerComponent
          selectedDate={tree?.events?.at(-1)?.date ? new Date(tree.events.at(-1)!.date) : new Date()}
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
