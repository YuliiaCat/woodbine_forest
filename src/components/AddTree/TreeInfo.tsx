import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import SharedText from '../SharedText';
import { fonts } from '../../constants/fonts';
import MapComponent from '../MapComponent';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectTreeData } from '../../redux/forest/selectors';
import { setTreeData } from '../../redux/forest/slice';

interface IInitialScreenProps {
  setIsDisabled: (disabled: boolean) => void;
}

const TreeInfo: React.FC<IInitialScreenProps> = ({ setIsDisabled }) => {
  const dispatch = useAppDispatch();
  const treeData = useAppSelector(selectTreeData);

  useEffect(() => {
    setIsDisabled(!(treeData.description && treeData.location?.address));
  }, [treeData, setIsDisabled]);

  const handleInputChange = (key: 'description' | 'locationName', value: string) => {
    dispatch(setTreeData({
      ...treeData,
      [key]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <SharedText
        text={'Tree info'}
        style={styles.title}
       />
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Description</Text>
        <TextInput
          placeholder={'Enter description'}
          placeholderTextColor={'#FDF9F980'}
          value={treeData?.description || ''}
          onChangeText={text => handleInputChange('description', text)}
          style={styles.input}
        />
      </View>

      <MapComponent
          location={treeData.location}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.text}>Location name</Text>
        <TextInput
          placeholder={'Enter location name'}
          placeholderTextColor={'#FDF9F980'}
          value={treeData?.locationName || ''}
          onChangeText={text => handleInputChange('locationName', text)}
          style={styles.input}
        />
      </View>
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

export default TreeInfo;
