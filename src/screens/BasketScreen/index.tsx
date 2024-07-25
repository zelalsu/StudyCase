import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromCart, updateQuantity} from '../../store/slices/cart';
import {ProductTypeApiParams} from '../../store/api/types';
import AddToCartButton from '../../components/Button/AddToCartButton';
import styles from './style';

const BasketScreen = () => {
  const cartList = useSelector(state => state.cart.cartList);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId: string, increment: boolean) => {
    const item = cartList.find(
      (product: {id: string}) => product.id === productId,
    );
    if (item) {
      const newQuantity = increment
        ? (item.quantity || 1) + 1
        : (item.quantity || 1) - 1;
      if (newQuantity > 0) {
        dispatch(updateQuantity({id: productId, quantity: newQuantity}));
      } else {
        handleRemoveFromCart(productId);
      }
    }
  };

  const totalPrice = cartList.reduce(
    (total: number, item: {price: string; quantity: any}) =>
      total + parseFloat(item.price) * (item.quantity || 1),
    0,
  );

  const renderItem = ({
    item,
  }: {
    item: ProductTypeApiParams & {quantity: number};
  }) => {
    const itemTotalPrice = item.price * (item.quantity || 1);

    return (
      <View style={styles.itemContainer}>
        <View style={styles.details}>
          <View>
            <Text style={styles.productName}>{item.name}</Text>

            <Text style={styles.itemTotalPrice}>
              {itemTotalPrice.toFixed(2)} ₺
            </Text>
          </View>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, false)}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, true)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty!</Text>
        }
      />
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.productPriceTitle}>Total:</Text>
            <Text style={styles.totalPrice}>{totalPrice} ₺</Text>
          </View>

          <AddToCartButton
            style={{width: 182}}
            title="Complete"
            onPress={() => {
              /* Handle Add to Cart logic here */
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default BasketScreen;
