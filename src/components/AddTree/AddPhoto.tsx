import { StyleSheet, View } from 'react-native';
import SharedText from '../SharedText';
import TreeImage from '../TreeImage/TreeImage';
import AddButton from '../AddButton';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectTreeData } from '../../redux/forest/selectors';
import { launchImageLibrary } from 'react-native-image-picker';
import { setTreeData } from '../../redux/forest/slice';
import RNFS from 'react-native-fs';
import { colors } from '../../constants/colors';

interface IInitialScreenProps {
  setIsDisabled: (disabled: boolean) => void;
}

const AddPhoto: React.FC<IInitialScreenProps> = ({ setIsDisabled }) => {
  const dispatch = useAppDispatch();
  const treeData = useAppSelector(selectTreeData);

  const handleSelectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
    });

    if (result.didCancel) {
      return;
    }

    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0].uri;

      if (selectedImage) {
        try {
          const filePath = selectedImage.replace('file://', '');

          const base64String = await RNFS.readFile(filePath, 'base64');
          const formattedImage = `data:image/jpeg;base64,${base64String}`;

          dispatch(setTreeData({
            ...treeData,
            image: formattedImage,
          }));
          setIsDisabled(false);
        } catch (error) {
          console.error('Error reading image file:', error);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <SharedText
        text={'Tree photo'}
        style={styles.title}
       />
      <View style={styles.photoContainer}>
        <View style={styles.imageBox}>
          <TreeImage
            source={{ uri: treeData?.image }}
            style={styles.image}
          />
          <TreeImage
            source={require('../../assets/img/addPhoto/add-photo.webp')}
            style={styles.overlayImage}
          />
        </View>
        <AddButton
          onPress={handleSelectImage}
          text={!treeData.image ? 'Add photo' : 'Change photo'}
          styleText={styles.btnText}
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
    color: colors.white,
  },
  photoContainer: {
    gap: 16,
    alignItems: 'center',
    paddingVertical: 29,
    paddingHorizontal: 16,
    backgroundColor: '#232323',
    borderRadius: 16,
    boxShadow: '0px 0px 30px 0px #00000014',
  },
  imageBox: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: '50%',
    backgroundColor: '#5A5A5A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  overlayImage: {
    position: 'absolute',
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  btnText: {
    fontSize: 20,
  },
});

export default AddPhoto;
