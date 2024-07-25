// FavoriteScreen.test.js
import * as React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import favoriteReducer from '../store/slices/favorites';
import FavoriteScreen from '../screens/FavoriteScreen';

// Mock Store setup
const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
  },
});

describe('FavoriteScreen', () => {
  it('renders empty message when there are no favorite products', () => {
    render(
      <Provider store={store}>
        <FavoriteScreen />
      </Provider>,
    );

    expect(screen.getByText('No favorite products.')).toBeTruthy();
  });

  it('renders favorite products and allows removing a product', () => {
    // Dispatch an action to add a favorite product
    store.dispatch({
      type: 'favorites/addToFavorite',
      payload: {
        id: '1',
        name: 'Sample Product',
        price: '100',
        image: 'https://example.com/image.jpg',
      },
    });

    render(
      <Provider store={store}>
        <FavoriteScreen />
      </Provider>,
    );

    // Check if the favorite product is rendered
    expect(screen.getByText('Sample Product')).toBeTruthy();
    expect(screen.getByText('100 ₺')).toBeTruthy();

    // Simulate pressing the remove button
    fireEvent.press(screen.getByText('Remove'));

    // Check if the product is removed
    expect(screen.queryByText('Sample Product')).toBeNull();
    expect(screen.queryByText('100 ₺')).toBeNull();
  });
});
