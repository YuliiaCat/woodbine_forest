import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ITree from '../../types/tree';
import { addFavoriteOperation, deleteFavoriteOperation, fetchFavoritesOperation } from './operations';

interface IFavorites {
  favorites: ITree[];
  loading: boolean;
}

const initialState: IFavorites = {
  favorites: [],
  loading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<ITree[]>) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action: PayloadAction<ITree>) => {
      state.favorites.push(action.payload);
    },
    deleteFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesOperation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavoritesOperation.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload ?? [];
      })
      .addCase(fetchFavoritesOperation.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addFavoriteOperation.fulfilled, (state, action) => {
        if (action.payload) {
          state.favorites.push(action.payload);
        }
      })
      .addCase(deleteFavoriteOperation.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = state.favorites.filter(item => item.id !== action.payload);
      });
  },
},
);

export const { setFavorites, addFavorite, deleteFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
