import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fonts } from '../../constants/fonts';
import DatePickerComponent from '../DatePickerComponent';
import SharedText from '../SharedText';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectTreeData } from '../../redux/forest/selectors';
import { setTreeData } from '../../redux/forest/slice';
import ITree from '../../types/tree';

interface IInitialScreenProps {
  setIsDisabled: (disabled: boolean) => void;
}

const InitialScreen: React.FC<IInitialScreenProps> = ({ setIsDisabled }) => {
  const dispatch = useAppDispatch();
  const treeData = useAppSelector(selectTreeData);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setIsDisabled(!(treeData.title && treeData.date));
  }, [treeData, setIsDisabled]);

  const handleInputChange = (key: keyof ITree, value: string | Date | null) => {
    const formattedValue = key === 'date' && value instanceof Date ? value.toISOString() : value;
    dispatch(setTreeData({
      ...treeData,
      id: treeData.id ?? Date.now(),
      [key]: formattedValue,
    }));
  };

  return (
    <View style={styles.container}>
      <SharedText
        text={'Tree info'}
        style={styles.title}
       />
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Name of tree</Text>
        <TextInput
          placeholder={'Enter name of tree'}
          placeholderTextColor={'#FDF9F980'}
          value={treeData?.title ?? ''}
          onChangeText={text => handleInputChange('title', text)}
          style={styles.input}
        />
      </View>

      {!showCalendar ? (
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Select date for planting tree</Text>
          <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <Text style={treeData?.date ? styles.input : styles.placeholder}>
              {treeData?.date
                ? new Date(treeData.date).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric',  year: 'numeric' }).replaceAll('/', '-')
                : '-'}
            </Text>
          </TouchableOpacity>
        </View>
        ) : (
          <DatePickerComponent
            selectedDate={treeData?.date ? new Date(treeData.date) : new Date()}
            onSelectDate={(date) => {
              handleInputChange('date', date);
              setShowCalendar(false);
            }}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  title: {
    color: '#FFFFFF',
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

export default InitialScreen;
