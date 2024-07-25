import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProductTypeApiParams} from '../store/api/types';

// NAVIGATION
export type RootStackParams = {
  TabNavigator: NavigatorScreenParams<TabStackParams>;
  FilterScreen: undefined;
};

export type TabStackParams = {
  HomeNavigator: NavigatorScreenParams<HomeStackParams>;
  BasketScreen: undefined;
  FavoriteScreen: undefined;
  ProfileScreen: undefined;
};

export type HomeStackParams = {
  HomeScreen: {sortBy?: string; brand?: string; model?: string};
  ProductDetailScreen: {item: ProductTypeApiParams};
};

// PROPS
export type RootStackScreenProps<T extends keyof RootStackParams> =
  NativeStackScreenProps<RootStackParams, T>;

export type TabStackScreenProps<
  T extends keyof RootStackParams,
  E extends keyof TabStackParams,
> = CompositeScreenProps<
  NativeStackScreenProps<TabStackParams, E>,
  NativeStackScreenProps<RootStackParams, T>
>;

export type HomeStackScreenProps<
  T extends keyof TabStackParams,
  E extends keyof HomeStackParams,
> = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParams, E>,
  CompositeScreenProps<
    NativeStackScreenProps<TabStackParams, T>,
    NativeStackScreenProps<RootStackParams, 'TabNavigator'>
  >
>;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}
