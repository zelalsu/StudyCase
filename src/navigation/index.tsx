import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/HomeScreen/DetailScreen';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Image, TouchableOpacity} from 'react-native';
import {HomeStackParams, RootStackParams, TabStackParams} from './types';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FilterScreen from '../screens/FilterScreen';
import TabNavigator from './TabNavigator';

const Root = createNativeStackNavigator<RootStackParams>();
const Stack = createStackNavigator<HomeStackParams>();

const Navigation = () => (
  <NavigationContainer>
    <Root.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Root.Screen name="TabNavigator" component={TabNavigator} />
      <Root.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={({navigation}) => ({
          headerShown: true,
          presentation: 'modal',
          animation: 'slide_from_bottom',
          headerTitle: 'Filter',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{width: 24, height: 24}}
                source={require('../assets/Close.png')}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Root.Navigator>
  </NavigationContainer>
);

export const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        title: 'E-Market',
        headerShown: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {
          backgroundColor: '#2A59FE',
        },
        headerTitleStyle: {
          color: 'white',
          fontWeight: '800',
          fontSize: 24,
        },
      }}
    />
    <Stack.Screen
      name="ProductDetailScreen"
      component={DetailScreen}
      options={({route}) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2A59FE',
        },
        headerTitleStyle: {
          color: 'white',
          fontWeight: '800',
          fontSize: 24,
        },
        headerTintColor: 'white', // İkon ve başlık rengini beyaz yapar

        headerTitle: route.params?.item?.name || 'Product Details',
      })}
    />
  </Stack.Navigator>
);

export default Navigation;
