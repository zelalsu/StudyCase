import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

type AddToCartButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
  title: string;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onPress,
  style,
  title,
}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonTxt}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2A59FE',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default AddToCartButton;
