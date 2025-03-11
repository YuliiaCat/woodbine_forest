import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import BackButton from '../components/BackButton';
import SharedButton from '../components/SharedButton';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectForest } from '../redux/forest/selectors';
import React, { useEffect, useState } from 'react';
import { NewTreeDetailsScreenNavigationProp, RootStackNavigation } from '../navigation/types';
import Title from '../components/Title';
import TreeImage from '../components/TreeImage/TreeImage';
import SharedInput from '../components/SharedInput';
import ITree from '../types/tree';
import { deleteTreeOperation, updateTreeData } from '../redux/forest/operations';
import NewTreeInfo from '../components/NewTreeInfo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import TrashIcon from '../assets/icons/TrashIcon copy';
import MapComponent from '../components/MapComponent';
import EventsList from '../components/EventsList';
import DatePickerComponent from '../components/DatePickerComponent';
import SharedTextFS from '../components/SharedComponents/SharedTextFS';
import { StackNavigationProp } from '@react-navigation/stack';

const NewTreeScreen = () => {
  const dispatch = useAppDispatch();
  const { params } = useRoute<NewTreeDetailsScreenNavigationProp['route']>();
  const forest = useAppSelector(selectForest);
  const { id, locationName, location } = params?.item;
  const tree = forest?.find(t => t.id === id) ?? null;
  const [editableTree, setEditableTree] = useState<ITree | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  useEffect(() => {
    if (tree) {
      setEditableTree(tree);
    }
  }, [tree]);

  useEffect(() => {
    if (!editMode && tree) {
      setEditableTree(tree);
    }
  }, [tree, editMode]);

  const handleInputChange = (key: keyof ITree, value: string | Date) => {
    setEditableTree(prev => {
      if (!prev) {
        return null;
      }
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleBlur = (key: keyof ITree) => {
    if (editableTree && editableTree.id !== undefined && editableTree[key] !== tree?.[key]) {
      dispatch(updateTreeData({ id: editableTree.id, [key]: editableTree[key] }));
    }
  };

  const handleEditPress = () => {
    if (editMode && editableTree && editableTree.id !== undefined) {
      dispatch(updateTreeData(editableTree));
    }

    setEditMode(prev => !prev);
  };

  const handleDelete = (treeId: number) => {
    dispatch(deleteTreeOperation(treeId));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({android: 20, ios: 90})}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <View style={styles.btnContainer}>
            <BackButton onPress={() => navigation.goBack()} />
            <SharedButton
              onPress={handleEditPress}
            >
              <SharedTextFS
                text={!editMode ? 'Edit' : 'Save'}
              />
            </SharedButton>
          </View>
          <Title title={editableTree?.title || 'My tree name'} />
          <TreeImage
            source={
              editableTree?.image
                ? { uri: editableTree.image }
                : require('../assets/img/main/tree.webp')
            }
            style={styles.image}
            key={editableTree?.image || 'default-tree'}
          />
          {!editMode ? (
            <NewTreeInfo
              text={'Description'}
              value={editableTree?.description || '-'}
            />
          ) : (
            <SharedInput
              text={'Description'}
              value={editableTree?.description || ''}
              onChange={text => handleInputChange('description', text)}
              onBlur={() => handleBlur('description')}
            />
          )}

          {!showCalendar ? (
            <SharedInput
              text={'Select date for planting tree'}
              value={editableTree?.date ? new Date(editableTree.date).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }).replaceAll('/', '-') : '-'}
              onChange={() => setShowCalendar(true)}
              onBlur={() => handleBlur('date')}
            />
          ) : (
            <DatePickerComponent
              selectedDate={editableTree?.date ? new Date(editableTree.date) : new Date()}
              onSelectDate={(date) => {
                handleInputChange('date', date);
                setShowCalendar(false);
              }}
            />
          )}

          {!editMode ? (
            <NewTreeInfo
              text={'Location name'}
              value={locationName ?? 'My garden'}
            />
          ) : (
            <SharedInput
              text={'Location name'}
              value={locationName ?? ''}
              onChange={text => handleInputChange('locationName', text)}
              onBlur={() => handleBlur('locationName')}
            />
          )}

          <MapComponent
              location={location}
            />

          {tree && <EventsList tree={tree} /> }

          <SharedButton
            onPress={() => editableTree?.id && handleDelete(editableTree.id)}
            styles={styles.deleteBtn}
          >
            <TrashIcon />
          </SharedButton>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 16,
  },
  deleteBtn: {
    width: '100%',
    backgroundColor: '#C80D0D',
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: 'center',
  },
});

export default NewTreeScreen;
