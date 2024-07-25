import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductTypeApiParams} from '../api/types';

// Cart state türü
type CartState = {
  cartList: ProductTypeApiParams[];
};

// Başlangıç durumu
const initialState: CartState = {
  cartList: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductTypeApiParams>) {
      const existingProduct = state.cartList.find(
        product => product.id === action.payload.id,
      );
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 0) + 1; // Miktarı artır
      } else {
        state.cartList.push({...action.payload, quantity: 1}); // Yeni ürün ekle
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cartList = state.cartList.filter(
        product => product.id !== action.payload,
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{id: string; quantity: number}>,
    ) {
      const existingProduct = state.cartList.find(
        product => product.id === action.payload.id,
      );
      if (existingProduct) {
        existingProduct.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.cartList = [];
    },
  },
});

export const {addToCart, removeFromCart, updateQuantity, clearCart} =
  cartSlice.actions;
export default cartSlice.reducer;
