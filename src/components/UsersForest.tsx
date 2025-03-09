import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import UsersForestCard from './UsersForestCard';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectForest } from '../redux/forest/selectors';
import { getTrees } from '../redux/forest/operations';
import React, { useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

const UsersForest = () => {
  const trees = useAppSelector(selectForest);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  useFocusEffect(
    useCallback(() => {
      dispatch(getTrees());
      return () => {};
    }, [dispatch])
  );

  console.log('trees', trees);

  return (
    <FlatList
      data={trees}
      scrollEnabled
      keyExtractor={(item, index) => item.id ? String(item.id) : `tree-${index}`}
      renderItem={({ item }) => (
        <UsersForestCard
          item={item}
          onPress={() => {navigation.navigate('NEW_TREE_SCREEN', {item});}}
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
