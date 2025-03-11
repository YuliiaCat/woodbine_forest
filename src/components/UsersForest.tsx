import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import UsersForestCard from './UsersForestCard';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import ITree from '../types/tree';

interface IUsersForest {
  trees: ITree[];
}

const UsersForest: React.FC<IUsersForest> = ({ trees }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  return (
    <FlatList
      data={trees}
      scrollEnabled
      keyExtractor={(item) => item.id.toString()}
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
