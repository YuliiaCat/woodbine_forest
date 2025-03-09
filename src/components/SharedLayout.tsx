import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from './NavBar/NavBar';
import React, { ReactNode  } from 'react';
import Title from './Title';
import FilterIcon from '../assets/icons/FilterIcon';
import IconPlus from '../assets/icons/IconPlus';
import SharedButton from './SharedButton';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

interface ISharedLayout {
  children: ReactNode;
  title: string;
  isForest?: boolean;
  setShowDropDown?: (value: boolean) => void;
}

const SharedLayout: React.FC<ISharedLayout> = ({ children, title, isForest, setShowDropDown }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Title title={title} />
        {isForest ? (
          <SharedButton onPress={() => navigation.navigate('ADD_TREE_SCREEN')}>
            <IconPlus fill={'#FDF9F9'} />
          </SharedButton>
        ) : (
          <SharedButton onPress={() => setShowDropDown && setShowDropDown(true)}>
            <FilterIcon fill={'#FDF9F9'} />
          </SharedButton>
        )}
      </View>
      <View style={styles.content}>
        {children}
        <NavBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
    content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 13,
  },
});

export default SharedLayout;
