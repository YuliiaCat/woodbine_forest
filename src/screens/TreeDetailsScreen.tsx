import { useRoute } from '@react-navigation/native';
import { TreeDetailsScreenNavigationProp } from '../navigation/types';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { fonts } from '../constants/fonts';
import Title from '../components/Title';
import SharedButton from '../components/SharedButton';
import HeartIcon from '../assets/icons/HeartIcon';
import LinearGradientComponent from '../components/LinearGradientComponent';
import BackButton from '../components/BackButton';
import TreeImage from '../components/TreeImage/TreeImage';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectFavorites } from '../redux/favorites/selectors';
import { addFavoriteOperation, deleteFavoriteOperation } from '../redux/favorites/operations';
import { colors } from '../constants/colors';
import SharedTextFS from '../components/SharedComponents/SharedTextFS';

const TreeDetailsScreen = () => {
  const { params } = useRoute<TreeDetailsScreenNavigationProp['route']>();
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(selectFavorites);
  const isFavorite = favorites.some(tree => tree.id === params.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(deleteFavoriteOperation(params.id));
    } else {
      const updatedTree = { ...params, isFavorite: true };
      dispatch(addFavoriteOperation(updatedTree));
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Title title={params.title} />
          <SharedButton
            styles={styles.btnHeart}
            onPress={toggleFavorite}
          >
            <HeartIcon fill={isFavorite ? '#C80D0D' : 'transparent'} stroke={'#FEFEFE'} />
          </SharedButton>
        </View>
        <View style={styles.imageBox}>
          <TreeImage source={params.image} style={styles.image} />
          <LinearGradientComponent
            colors={[ '#0000007A', '#00000000', '#00000000', '#0000007A']}
            styles={styles.gradient}
            locations={[0.1875, 0.3021, 0.6654, 0.8382]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          <Text style={styles.category}>{params.category}</Text>
        </View>
        <View style={styles.description}>
          <SharedTextFS
            text={'Description'}
            fontSize13={true}
          />
          <SharedTextFS
            text={params.description ?? ''}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: 24,
    gap: 8,
  },
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  content: {
    gap: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnHeart: {
    position: 'absolute',
    right: 0,
    top: 12,
  },
  imageBox: {
    position: 'relative',
    borderRadius: 16,
  },
  image: {
    width: '100%',
    height: 270,
    resizeMode: 'cover',
    zIndex: -1,
    borderRadius: 16,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  category: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: colors.lightColor,
    fontFamily: fonts.DMSansBold,
    fontSize: 16,
    lineHeight: 20.83,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#C80D0D',
    borderRadius: 16,
  },
  description: {
    backgroundColor: colors.inputColor,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 12,
  },
});

export default TreeDetailsScreen;
