import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductTypeApiParams} from '../api/types';

type FavoritesState = {
  favoriteList: ProductTypeApiParams[];
};

// Başlangıç durumu.
const initialState: FavoritesState = {
  favoriteList: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorite(state, action: PayloadAction<ProductTypeApiParams>) {
      // Ekleme işlemi öncesinde favoriye eklenmek istenen ürünün zaten favorilerde olup olmadığının kontrolü
      const existingProduct = state.favoriteList.find(
        product => product.id === action.payload.id,
      );
      if (!existingProduct) {
        state.favoriteList.push(action.payload);
      }
    },
    removeFromFavorite(state, action: PayloadAction<string>) {
      // Favorilerden kaldırma işlemi için filtreleme yaparak istenilen ürünün favorilerden kaldırılmasını sağlaması
      state.favoriteList = state.favoriteList.filter(
        product => product.id !== action.payload,
      );
    },
  },
});

export const {addToFavorite, removeFromFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
