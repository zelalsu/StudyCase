import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ProductTypeApiParams} from '../../store/api/types';
import styles from './style';
import {RootState} from '../../store';
import {removeFromFavorite} from '../../store/slices/favorites';

const FavoriteScreen = () => {
  const favoriteList = useSelector(
    (state: RootState) => state.favorites.favoriteList,
  );
  const dispatch = useDispatch();

  const renderFavoriteItem = ({item}: {item: ProductTypeApiParams}) => (
    <View style={styles.itemContainer}>
      <Image style={styles.image} source={{uri: item.image}} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price} ₺</Text>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(removeFromFavorite(item.id))}
        style={styles.deleteButton}>
        <Text style={styles.deleteTitle}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {favoriteList.length === 0 ? (
        <Text style={styles.emptyMessage}>No favorite products.</Text>
      ) : (
        <>
          <Text style={styles.emptyMessage}>Favorites</Text>
          <FlatList
            data={favoriteList}
            renderItem={renderFavoriteItem}
            keyExtractor={item => item.id.toString()}
          />
        </>
      )}
    </View>
  );
};

export default FavoriteScreen;
