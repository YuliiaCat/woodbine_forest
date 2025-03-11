import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../store';
import { addTree, deleteTree, setTreeData, setTrees, updateTree } from './slice';
import ITree from '../../types/tree';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTrees = createAsyncThunk(
  'forest/getTrees',
  async (_, { dispatch }) => {
    try {
      const storedTrees = await AsyncStorage.getItem('forest');
      const parsedTrees: ITree[] = storedTrees ? JSON.parse(storedTrees) : [];
      dispatch(setTrees(parsedTrees));
      return parsedTrees;
    } catch (error) {
      console.log('Error fetching trees:', error);
      return [];
    }
  }
);

export const addNewTree = createAsyncThunk(
  'forest/addNewTree',
  async (tree: ITree, { dispatch, getState }) => {
    try {
      dispatch(addTree(tree));

      const trees = (getState() as RootState).forest.trees;
      await AsyncStorage.setItem('forest', JSON.stringify(trees));
      return tree;
    } catch (error) {
      console.log('Error adding tree:', error);
    }
  }
);

export const deleteTreeOperation = createAsyncThunk(
  'forest/deleteTree',
  async (treeId: number, { dispatch, getState }) => {
    try {
      dispatch(deleteTree(treeId));
      const trees = (getState() as RootState).forest.trees;
      await AsyncStorage.setItem('forest', JSON.stringify(trees));

      return treeId;
    } catch (error) {
      console.log('Error deleting tree:', error);
    }
  }
);

export const setTreeDataOperation = createAsyncThunk(
  'forest/setTreeData',
  async (treeData: Partial<ITree>, { dispatch }) => {
    try {
      dispatch(setTreeData(treeData));
      return treeData;
    } catch (error) {
      console.error('Error setting tree data:', error);
      throw error;
    }
  }
);

export const updateTreeData = createAsyncThunk(
  'forest/updateTreeData',
  async (updatedTree: Partial<ITree> & { id: number }, { dispatch, getState }) => {
    try {
      dispatch(updateTree(updatedTree));
      const trees = (getState() as RootState).forest.trees;

      await AsyncStorage.setItem('forest', JSON.stringify(trees));

      return updatedTree;
    } catch (error) {
      console.error('Error updating tree:', error);
      throw error;
    }
  }
);


