import { useEffect } from 'react';
// import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import DatePickerComponent from '../DatePickerComponent';
// import SharedText from '../SharedText';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectTreeData } from '../../redux/forest/selectors';
import { setTreeData } from '../../redux/forest/slice';
import ITree from '../../types/tree';
// import { colors } from '../../constants/colors';
// import SharedInput from '../SharedInput';
import SharedAddForm from '../SharedComponents/SharedAddForm';

interface IInitialScreenProps {
  setIsDisabled: (disabled: boolean) => void;
}

const InitialScreen: React.FC<IInitialScreenProps> = ({ setIsDisabled }) => {
  const dispatch = useAppDispatch();
  const treeData = useAppSelector(selectTreeData);
  // const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setIsDisabled(!(treeData.title && treeData.date));
  }, [treeData, setIsDisabled]);

  const handleInputChange = (key: keyof ITree, value: string | Date | null) => {
    if (!treeData.id && key !== 'date') {
      return;
    }

    const formattedValue = key === 'date' && value instanceof Date ? value.toISOString() : value;
    dispatch(setTreeData({
      ...treeData,
      [key]: formattedValue,
    }));
  };

  console.log('treedata', treeData);

  return (
    <SharedAddForm
      title={'Tree info'}
      nameSubtitle={'Name of tree'}
      dateSubtitle={'Select date for planting tree'}
      namePlaceholder={'Enter name of tree'}
      datePlaceholder={'-'}
      handleInputChange={text => handleInputChange('title', text)}
      nameValue={treeData?.title ?? ''}
      dateValue={treeData?.date
        ? new Date(treeData.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          }).replaceAll('/', '-')
        : ''}
      selectedDate={treeData?.date ? new Date(treeData.date) : null}
    />
    // <View style={styles.container}>
    //   <SharedText
    //     text={'Tree info'}
    //     style={styles.title}
    //    />
    //    <SharedInput
    //       text={'Name of tree'}
    //       placeholder={'Enter name of tree'}
    //       value={treeData?.title ?? ''}
    //       onChange={text => handleInputChange('title', text)}
    //    />

    //   {!showCalendar ? (
    //     <TouchableOpacity onPress={() => setShowCalendar(true)}>
    //       <SharedInput
    //         text={'Select date for planting tree'}
    //         placeholder={'-'}
    //         value={treeData?.date
    //           ? new Date(treeData.date).toLocaleDateString('en-US', {
    //               day: 'numeric',
    //               month: 'numeric',
    //               year: 'numeric',
    //             }).replaceAll('/', '-')
    //           : ''}
    //         editable={false}
    //       />
    //     </TouchableOpacity>
    //     ) : (
    //       <DatePickerComponent
    //         selectedDate={treeData?.date ? new Date(treeData.date) : null}
    //         onSelectDate={(date) => {
    //           handleInputChange('date', date);
    //           setShowCalendar(false);
    //         }}
    //       />
    //     )}
    // </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     gap: 10,
//   },
//   title: {
//     color: colors.white,
//   },
// });

export default InitialScreen;
