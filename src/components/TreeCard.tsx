import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import TreeImage from './TreeImage/TreeImage';
import React from 'react';
import { fonts } from '../constants/fonts';
import LinearGradientComponent from './LinearGradientComponent';
import HeartIcon from '../assets/icons/HeartIcon';
import { useNavigation } from '@react-navigation/native';
import { TreeDetailsScreenNavigationProp } from '../navigation/types';
import SharedButton from './SharedButton';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectFavorites } from '../redux/favorites/selectors';
import ITree from '../types/tree';
import { addFavoriteOperation, deleteFavoriteOperation } from '../redux/favorites/operations';
import { colors } from '../constants/colors';

interface ITreeCard {
  item: ITree;
}

const TreeCard: React.FC<ITreeCard> = ({ item }) => {
  const { id, image, title, category, description } = item;
  const navigation = useNavigation<TreeDetailsScreenNavigationProp['navigation']>();
  const favorites = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();

  const isFavorite = favorites.some(tree => tree.id === id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(deleteFavoriteOperation(id));
      return;
    } const updatedTree = { ...item, isFavorite: true };
      dispatch(addFavoriteOperation(updatedTree));
  };

  const onPress = () => {
    navigation.navigate('TREE_DETAILS_SCREEN', {
      id,
      image,
      title,
      category,
      description: description ?? '',
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <TreeImage
        source={image}
        style={styles.imageBox}
      />
      <LinearGradientComponent
        colors={[ '#0000007A', '#00000000', '#00000000', '#0000007A']}
        styles={styles.gradient}
        locations={[0.1875, 0.3021, 0.6654, 0.8382]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <SharedButton
          onPress={toggleFavorite}
          styles={styles.icon}>
        <HeartIcon fill={isFavorite ? '#C80D0D' : 'transparent'} stroke={'#FEFEFE'} />
      </SharedButton>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 342,
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 16,
  },
  imageBox: {
    width: '100%',
    height: 270,
    resizeMode: 'cover',
    zIndex: -1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  icon: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  category: {
    position: 'absolute',
    top: 60,
    left: 20,
    color: colors.lightColor,
    fontFamily: fonts.DMSansBold,
    fontSize: 16,
    lineHeight: 20.83,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.red,
    borderRadius: 16,
  },
  title: {
    position: 'absolute',
    color: colors.white,
    fontFamily: fonts.DMSansBold,
    fontSize: 20,
    lineHeight: 26.04,
    left: 20,
    bottom: 20,
    right: 20,
  },
});

export default TreeCard;
