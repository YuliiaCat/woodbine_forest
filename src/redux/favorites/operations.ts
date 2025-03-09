import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { deleteFavorite, setFavorites } from './slice';
import ITree from '../../types/tree';

export const fetchFavoritesOperation = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, { dispatch }) => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const parsedFavorites: ITree[] = storedFavorites ? JSON.parse(storedFavorites) : [];
      dispatch(setFavorites(parsedFavorites));
      return parsedFavorites;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addFavoriteOperation = createAsyncThunk(
  'favorites/addFavorite',
  async (tree: ITree, { getState }) => {
    try {
      const state = getState() as RootState;
      const updatedTree = { ...tree, isFavorite: true };
      const updatedFavorites = [...state.favorites.favorites, updatedTree];
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return tree;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteFavoriteOperation = createAsyncThunk(
  'favorites/deleteFavorite',
  async (treeId: number, { dispatch, getState }) => {
    try {
      dispatch(deleteFavorite(treeId));
      const favorites = (getState() as RootState).favorites.favorites;
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      return treeId;
    } catch(error) {
      console.log(error);
    }
  }
);

