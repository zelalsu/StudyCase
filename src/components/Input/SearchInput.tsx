import {View, TextInput, StyleSheet, Image} from 'react-native';
import React from 'react';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={{width: 24, height: 24, marginLeft: 7}}
        source={require('../../assets/Search.png')}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 8,
    padding: 3,
    gap: 8,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  input: {
    height: 40,
    fontSize: 16,
  },
});

export default SearchInput;
