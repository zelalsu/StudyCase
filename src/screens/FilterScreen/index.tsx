import React, {useMemo, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import SearchInput from '../../components/Input/SearchInput';
import AddToCartButton from '../../components/Button/AddToCartButton';
import {RootStackScreenProps} from '../../navigation/types';
import styles from './style';
import {getBrands, getModels, getSortOptions} from '../../data/FilterData';
import RadioGroup from 'react-native-radio-buttons-group';

const FilterScreen = ({navigation}: RootStackScreenProps<'FilterScreen'>) => {
  const [selectedSortBy, setSelectedSortBy] = useState<string | undefined>();
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedModel, setSelectedModel] = useState<string | undefined>();
  const [searchTermBrand, setSearchTermBrand] = useState('');
  const [searchTermModel, setSearchTermModel] = useState('');

  const allBrands = useMemo(() => getBrands(), []);
  const allModels = useMemo(() => getModels(), []);
  const sortOptions = useMemo(() => getSortOptions(), []);

  // Filter function
  const filterItems = (items: any[], searchTerm: string) =>
    items.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const filteredBrands = filterItems(allBrands, searchTermBrand);
  const filteredModels = filterItems(allModels, searchTermModel);

  const getRadioButtons = (items: any[]) =>
    items.map(item => ({
      id: item.id,
      label: item.label,
      value: item.value,
      color: '#2A59FE',
    }));

  const radioButtonsBrands = getRadioButtons(filteredBrands);
  const radioButtonsModels = getRadioButtons(filteredModels);

  const applyFilters = () => {
    navigation.navigate('TabNavigator', {
      screen: 'HomeNavigator',
      params: {
        screen: 'HomeScreen',
        params: {
          sortBy: selectedSortBy || '',
          brand: selectedBrand || '',
          model: selectedModel || '',
        },
      },
    });
  };

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.title}>Sort By</Text>
          <RadioGroup
            radioButtons={sortOptions}
            onPress={setSelectedSortBy}
            selectedId={selectedSortBy}
            containerStyle={styles.radioGroup}
          />
          <View style={styles.separator} />
          <Text style={styles.title}>Brand</Text>
          <SearchInput
            value={searchTermBrand}
            onChangeText={setSearchTermBrand}
            placeholder="Search"
          />
          <RadioGroup
            radioButtons={radioButtonsBrands}
            onPress={setSelectedBrand}
            selectedId={selectedBrand}
            containerStyle={styles.radioGroup}
          />
          <View style={styles.separator} />
          <Text style={styles.title}>Model</Text>
          <SearchInput
            value={searchTermModel}
            onChangeText={setSearchTermModel}
            placeholder="Search"
          />
          <RadioGroup
            radioButtons={radioButtonsModels}
            onPress={setSelectedModel}
            selectedId={selectedModel}
            containerStyle={styles.radioGroup}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <AddToCartButton title="Apply Filters" onPress={applyFilters} />
      </View>
    </>
  );
};

export default FilterScreen;
