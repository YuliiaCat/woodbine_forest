import { FlatList, StyleSheet, Text } from 'react-native';
import { fonts } from '../constants/fonts';
import treeData from '../data/treeData';
import { useEffect, useRef, useState } from 'react';
import TreeCard from '../components/TreeCard';
import { useAppDispatch } from '../redux/hooks';
import { fetchFavoritesOperation } from '../redux/favorites/operations';
import FilterDropdown from '../components/FilterDropdown';
import { TTreeCategory } from '../types/treeCategory';
import SharedLayout from '../components/SharedLayout/SharedLayout';

const InfoTreesScreen = () => {
  const flatListRef = useRef<FlatList>(null);
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<TTreeCategory>('All');
  const [showDropdown, setShowDropDown] = useState(false);
  const categories: TTreeCategory[] = ['All', ...treeData.reduce<TTreeCategory[]>((acc, tree) => {
    if (tree.category && !acc.includes(tree.category as TTreeCategory)) {
      acc.push(tree.category as TTreeCategory);
    }
    return acc;
  }, [])];

  const filteredTrees = selectedCategory === 'All'
    ? treeData
    : treeData.filter(tree => tree.category === selectedCategory);

  useEffect(() => {
    dispatch(fetchFavoritesOperation());
  }, [dispatch]);

  return (
    <SharedLayout
      title={'Woodbine Trees'}
      setShowDropDown={setShowDropDown}
    >
      {showDropdown && (
        <FilterDropdown
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        setShowDropDown={setShowDropDown}
        />
      )}
      <Text style={styles.filterText}>{selectedCategory}</Text>
      <FlatList
        ref={flatListRef}
        data={filteredTrees}
        scrollEnabled
        keyExtractor={(item) => (item.id ? String(item.id) : Math.random().toString())}
        renderItem={({ item }) => (
          <TreeCard
            item={item}
          />
        )}
        contentContainerStyle={styles.list}
      />
  </SharedLayout>
  );
};

const styles = StyleSheet.create({
  filterText: {
    color: '#818181',
    fontFamily: fonts.DMSansBold,
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  list: {
    gap: 16,
  },
});

export default InfoTreesScreen;
