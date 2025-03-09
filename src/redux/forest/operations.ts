import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../store';
import { addEvent, addTree, deleteTree, setTrees, updateTree, setTreeData } from './slice';
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
  async (treeData: ITree, { dispatch }) => {
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
    }
  }
);

export const addEventOperation = createAsyncThunk<
  { treeId: number; event: { eventId: number; description: string; date: string } },
  { treeId: number; description: string; date: Date | null },
  { state: RootState }
>(
  'forest/addEvent',
  async ({ treeId, description, date }, { dispatch, getState }) => {
    try {
      const newEvent = {
        eventId: Date.now(),
        description,
        date: date ? new Date(date).toISOString() : new Date().toISOString(),
      };

      dispatch(addEvent({ id: treeId, event: newEvent }));

      const trees = getState().forest.trees;
      await AsyncStorage.setItem('forest', JSON.stringify(trees));

      return { treeId, event: newEvent };
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  }
);

export const deleteEventOperation = createAsyncThunk(
  'forest/deleteEvent',
  async ({ id, eventId }: { id: number; eventId: number }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const trees = state.forest.trees;

      if (!trees || trees.length === 0) {
        return null;
      }

      const updatedTrees = trees.map(tree =>
        tree.id === id
          ? { ...tree, event: tree.event?.filter(event => event.eventId !== eventId) ?? [] }
          : tree
      );

      dispatch(setTrees(updatedTrees));

      await AsyncStorage.setItem('forest', JSON.stringify(updatedTrees));

      return { id, eventId };
    } catch (error) {
      console.error('Error deleting event:', error);
      return null;
    }
  }
);

