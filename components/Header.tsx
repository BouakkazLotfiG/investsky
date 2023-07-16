import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { COLORS, SIZES } from '../constants/Theme';

export default function Header() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.headerNavigation}>
        <FontAwesomeIcon icon={faBars} size={23} color='white' />
        <FontAwesomeIcon icon={faBell} size={23} color='white' />
      </View>
      <Text style={styles.headerText}>Markets</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: '30%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
    paddingVertical: SIZES.paddingVertical,
    paddingHorizontal: SIZES.paddingHorizontal * 1.5,

    paddingTop: SIZES.padding * 2,
    backgroundColor: COLORS.primary,
  },
  headerNavigation: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuIcon: {
    marginRight: 10,
  },
  headerText: {
    width: SIZES.width,
    paddingLeft: SIZES.paddingHorizontal * 1.5,
    fontSize: SIZES.h1 * 1.5,
    fontFamily: 'Roboto-ExtraBold',
    textAlign: 'left',
    color: COLORS.white,
  },
  searchContainer: {
    width: '100%',
  },
  notificationIcon: {
    marginLeft: 10,
  },
});
