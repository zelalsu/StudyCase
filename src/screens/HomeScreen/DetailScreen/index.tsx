import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import AddToCartButton from '../../../components/Button/AddToCartButton';
import {HomeStackParams} from '../../../navigation/types';
import {addToCart} from '../../../store/slices/cart';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {
  addToFavorite,
  removeFromFavorite,
} from '../../../store/slices/favorites';
import styles from './style';

type DetailScreenRouteProp = RouteProp<HomeStackParams, 'ProductDetailScreen'>;

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const {item} = route.params || {};
  const dispatch = useDispatch();

  // Redux state'den favori ürünleri al
  const favoriteList = useSelector(
    (state: RootState) => state.favorites.favoriteList,
  );
  const isFavorite = favoriteList.some(product => product.id === item.id);

  // Favoriyi toggle etme işlevi
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorite(item.id));
    } else {
      dispatch(addToFavorite(item));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: item.image}} />
          <TouchableOpacity
            onPress={handleFavoriteToggle}
            style={styles.favoriteButton}>
            <Image
              style={styles.favoriteIcon}
              source={
                isFavorite
                  ? require('../../../assets/StarFill.png')
                  : require('../../../assets/Star.png')
              }
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.productPriceTitle}>Price:</Text>
            <Text style={styles.productPrice}>{item.price} ₺</Text>
          </View>
          <AddToCartButton
            style={{width: 182}}
            title="Add To Cart"
            onPress={() => {
              dispatch(addToCart(item));
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;
