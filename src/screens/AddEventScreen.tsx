import { useNavigation } from '@react-navigation/native';
import ScreensLayout from '../components/SharedLayout/ScreensLayout';
import { NavigationProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectTreeData } from '../redux/forest/selectors';
import SharedInput from '../components/SharedInput';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SharedText from '../components/SharedText';
import { fonts } from '../constants/fonts';
import { useState } from 'react';
import DatePickerComponent from '../components/DatePickerComponent';
import { addEventOperation, setTreeDataOperation } from '../redux/forest/operations';
import ITree from '../types/tree';

const AddEventScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const treeData = useAppSelector(selectTreeData);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleAdd = () => {
    if (!treeData.id || !treeData.event || treeData.event.length === 0) {
      return;
    }

    const event = treeData.event[0];
    if (!event.description || !event.date) {
      return;
    }

    dispatch(
      addEventOperation({
        treeId: treeData.id,
        description: event.description,
        date: event.date,
      })
    );

    navigation.navigate('MAIN_SCREEN');
  };

  const handleInputChange = (key: keyof ITree, value: string | Date | null) => {
    const formattedValue = key === 'date' && value instanceof Date ? value.toISOString() : value;

    dispatch(
      setTreeDataOperation({
        event: [
          {
            eventId: treeData.event?.[0]?.eventId ?? Date.now(),
            description: key === 'description' ? (formattedValue as string) : treeData.event?.[0]?.description ?? '',
            date: key === 'date' ? (formattedValue ? new Date(formattedValue) : null) : treeData.event?.[0]?.date ?? null,
          },
        ],
        id: 0,
        image: null,
        title: '',
      })
    );
  };

  return (
    <ScreensLayout
      title={'Add event'}
      btnText={'Add'}
      onNext={handleAdd}
    >
      <View style={styles.container}>
        <SharedText
          text={'Event info'}
          style={styles.title}
        />
        <View style={styles.inputWrapper}>
          <SharedInput
            text={'Tell me what you were doing. For example, transplanted the tree, watered the tree, added fertilizer, etc.'}
            value={treeData?.event?.[0]?.description ?? ''}
            placeholder={'Enter description'}
            onChange={text => handleInputChange('description', text)}
          />
          {!showCalendar ? (
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Select date for planting tree</Text>
            <TouchableOpacity onPress={() => setShowCalendar(true)}>
            <Text style={treeData?.date ? styles.input : styles.placeholder}>
              {treeData?.event?.[0]?.date
                ? new Date(treeData.event[0].date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  }).replaceAll('/', '-')
                : '-'}
              </Text>
            </TouchableOpacity>
          </View>
          ) : (
            <DatePickerComponent
              selectedDate={
                treeData?.event?.[0]?.date
                  ? new Date(treeData.event[0].date)
                  : new Date()
              }
              onSelectDate={(date) => {
                handleInputChange('date', date);
                setShowCalendar(false);
              }}
            />
          )}
        </View>
      </View>
    </ScreensLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  title: {
    color: '#ffffff',
    fontFamily: fonts.DMSansRegular,
    fontSize: 16,
    lineHeight: 41,
    letterSpacing: 0.37,
  },
  inputWrapper: {
    gap: 8,
  },
  inputContainer: {
    backgroundColor: '#252525',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  text: {
    color: '#fdf9f9',
    fontFamily: fonts.DMSansRegular,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  input: {
    color: '#fdf9f9',
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  placeholder: {
    color: '#FDF9F980',
    fontFamily: fonts.DMSansRegular,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
});

export default AddEventScreen;
