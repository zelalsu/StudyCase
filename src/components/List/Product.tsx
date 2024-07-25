import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ProductTypeApiParams} from '../../store/api/types';
import {addToFavorite, removeFromFavorite} from '../../store/slices/favorites';
import AddToCartButton from '../Button/AddToCartButton';
import {addToCart} from '../../store/slices/cart';
import {RootState} from '../../store'; // Store'dan RootState türünü içe aktarma

type ProductItemProps = {
  item: ProductTypeApiParams;
  navigation: any;
};

const ProductItem: React.FC<ProductItemProps> = ({item, navigation}) => {
  const dispatch = useDispatch();
  const favoriteList = useSelector(
    (state: RootState) => state.favorites.favoriteList,
  );

  if (!favoriteList) {
    console.log('favoriteList is undefined or null');
  }

  const isFavorite = favoriteList?.some(
    (product: {id: string}) => product.id === item.id,
  );

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorite(item.id));
    } else {
      dispatch(addToFavorite(item));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetailScreen', {item})}
      style={styles.container}>
      <View>
        <Image
          style={{width: '100%', height: 150}}
          source={{uri: item.image}}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoriteToggle}>
          <Image
            style={styles.favoriteIcon}
            source={
              isFavorite
                ? require('../../assets/StarFill.png')
                : require('../../assets/Star.png')
            }
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.productPrice}>{item.price} ₺</Text>
      <Text style={styles.productName}>{item.name}</Text>
      <AddToCartButton
        title="Add to Cart"
        onPress={handleAddToCart} // Sepete ekleme işlevini buraya ekleyin
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
    elevation: 2,
    margin: 10,
    borderRadius: 5,
    height: 302,
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: 14,
    color: '#2A59FE',
    fontWeight: '500',
  },
  productName: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  button: {
    width: '100%',
    backgroundColor: '#2A59FE',
    borderRadius: 4,
    marginTop: 4,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  buttonTxt: {
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    color: 'white',
  },
  favoriteButton: {
    position: 'absolute',
    right: 0,
    top: 4,
    width: 30,
    height: 30,
  },
  favoriteIcon: {
    width: 24,
    height: 24,
  },
});

export default ProductItem;
