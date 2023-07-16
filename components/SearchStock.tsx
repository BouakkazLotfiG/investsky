import React, { useState } from 'react';

import { TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { SIZES, COLORS } from '../constants/Theme';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { MOCK_API_KEY } from '@env';

interface StockSearchProps {
  onResults: (results: any) => void;
}

const StockSearch: React.FC<StockSearchProps> = (props) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    console.log('SEARCHING', query);
    const url = new URL(`https://${MOCK_API_KEY}.mockapi.io/stocks`);
    url.searchParams.append('name', query);

    fetch(url, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((stocks) => {
        props.onResults(stocks);
      })
      .catch((error) => {
        console.log('error ', error);
      });
  };

  return (
    <SafeAreaView style={styles.searchBar}>
      <FontAwesomeIcon style={styles.searchIcon} icon={faSearch} />
      <TextInput
        onSubmitEditing={handleSearch}
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholder='Search...'
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: COLORS.dimmedWihte,
    width: SIZES.width * 0.9,
    borderRadius: 10,
    paddingHorizontal: SIZES.paddingHorizontal * 1.5,
    paddingVertical: SIZES.paddingVertical,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 5,
    color: COLORS.gray,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
});

export default StockSearch;
