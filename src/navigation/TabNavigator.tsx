import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {TabStackParams} from './types';
import {Image, StyleSheet, Text, View} from 'react-native';
import BasketScreen from '../screens/BasketScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {HomeNavigator} from '.';

const Tab = createBottomTabNavigator<TabStackParams>();

const useCartQuantity = () => {
  return useSelector(state =>
    state.cart.cartList.reduce(
      (total: number, item: {quantity: number}) => total + (item.quantity || 0),
      0,
    ),
  );
};

const TabNavigator = () => {
  const cartQuantity = useCartQuantity(); // Sepet miktarını al

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          let iconName;
          switch (route.name) {
            case 'HomeNavigator':
              iconName = require('../assets/TabIcons/Home.png');
              break;
            case 'BasketScreen':
              iconName = require('../assets/TabIcons/Basket.png');
              break;
            case 'FavoriteScreen':
              iconName = require('../assets/TabIcons/Favorite.png');
              break;
            case 'ProfileScreen':
              iconName = require('../assets/TabIcons/Profile.png');
              break;
            default:
              iconName = require('../assets/TabIcons/Home.png');
          }
          return (
            <View style={styles.iconContainer}>
              <Image source={iconName} style={styles.icon} />
              {route.name === 'BasketScreen' && cartQuantity > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartQuantity}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#f8f9fa',
        },
        headerStyle: {
          backgroundColor: '#2A59FE',
        },
        headerTitleStyle: {
          color: 'white',
          fontWeight: '800',
          fontSize: 24,
        },
        tabBarLabelStyle: {
          color: '#333',
        },
        title: 'E-Market',
      })}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="BasketScreen" component={BasketScreen} />
      <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
export default TabNavigator;

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
  },
  icon: {
    width: 30,
    height: 30,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#F90000',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
