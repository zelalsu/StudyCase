import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {useLazyProductQuery} from '../../store/api/product';
import {ProductTypeApiResponse} from '../../store/api/types';
import SearchInput from '../../components/Input/SearchInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import {HomeStackScreenProps} from '../../navigation/types';
import styles from './style';
import ProductItem from '../../components/List/Product';

const HomeScreen = ({
  navigation,
}: HomeStackScreenProps<'HomeNavigator', 'HomeScreen'>) => {
  const route = useRoute();
  const [products, setProducts] = useState<ProductTypeApiResponse>([]);
  const [filteredProducts, setFilteredProducts] =
    useState<ProductTypeApiResponse>([]);
  const [newsQuery] = useLazyProductQuery();

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    newsQuery().then(res => {
      if (res && Array.isArray(res.data)) {
        setProducts(res.data as ProductTypeApiResponse);
        setFilteredProducts(res.data as ProductTypeApiResponse);
      } else {
        console.error('Invalid data format:', res);
      }
    });
  }, [newsQuery]);

  useEffect(() => {
    if (route.params) {
      applyFilters(route.params);
    }
  }, [route.params]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, products]);

  const applyFilters = ({
    sortBy,
    brand,
    model,
  }: {
    sortBy?: string;
    brand?: string;
    model?: string;
  }) => {
    let filtered = [...products];

    if (sortBy) {
      switch (sortBy) {
        case '1':
          filtered = filtered.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );
          break;
        case '2':
          filtered = filtered.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );
          break;
        case '3':
          filtered = filtered.sort((a, b) => b.price - a.price);
          break;
        case '4':
          filtered = filtered.sort((a, b) => a.price - b.price);
          break;
      }
    }

    if (brand) {
      filtered = filtered.filter(
        product => product.brand.toLowerCase() === brand.toLowerCase(),
      );
    }

    if (model) {
      filtered = filtered.filter(
        product => product.model.toLowerCase() === model.toLowerCase(),
      );
    }

    setFilteredProducts(filtered);
  };

  const filterProducts = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(lowercasedSearchTerm),
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SearchInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search"
      />
      <View style={styles.filterContainer}>
        <Text style={styles.label}>Filters:</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('FilterScreen')}
          style={styles.filterButton}>
          <Text style={styles.selectFilter}>Select Filter</Text>
        </TouchableOpacity>
      </View>

      <FlashList
        numColumns={2}
        data={filteredProducts}
        renderItem={({item}) => (
          <ProductItem item={item} navigation={navigation} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default HomeScreen;
