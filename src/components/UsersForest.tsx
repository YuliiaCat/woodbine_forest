import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import UsersForestCard from './UsersForestCard';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectForest } from '../redux/forest/selectors';
import { getTrees } from '../redux/forest/operations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsersForest  = () => {
  const trees = useAppSelector(selectForest);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  useEffect(() => {
    const fetchTrees = async () => {
      const storedTrees = await AsyncStorage.getItem('forest');
      if (!storedTrees) {
        dispatch(getTrees());
      }
    };

    fetchTrees();
  }, [dispatch]);


  console.log('trees', trees);

  return (
    <FlatList
      data={trees}
      scrollEnabled
      keyExtractor={(item) => item.id ? item.id?.toString() : Math.random().toString()}
      renderItem={({ item }) => (
        <UsersForestCard
          item={item}
          onPress={() => {
            navigation.navigate('NEW_TREE_SCREEN', { item: item });
          }}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 24,
  },
});

export default UsersForest;
