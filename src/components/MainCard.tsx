import { StyleSheet, Text, View } from 'react-native';
import TreeImage from './TreeImage/TreeImage';
import { fonts } from '../constants/fonts';
import AddButton from './AddButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigation } from '../navigation/types';
import { colors } from '../constants/colors';

const MainCard = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  return (
    <View style={styles.treeCard}>
      <TreeImage
        style={styles.image}
        source={require('../assets/img/main/first-tree.webp')}
      />
      <Text style={styles.text}>Add your first tree!</Text>
      <AddButton
          onPress={() => navigation.navigate('ADD_TREE_SCREEN')}
          text={'Add the first tree'}
          style={styles.btnAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  treeCard: {
    backgroundColor: colors.treeCardColor,
    borderRadius: 15,
    padding: 16,
    gap: 13,
    alignItems: 'center',
  },
  image: {
    width: 310,
    maxHeight: 310,
  },
  text: {
    color: colors.white,
    fontFamily: fonts.DMSansMedium,
    fontSize: 24,
    lineHeight: 21,
    textAlign: 'center',
    paddingVertical: 15,
  },
  btnAdd: {
    width: 310,
  },
});

export default MainCard;
