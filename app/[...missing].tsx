import { View, Text, SafeAreaView, Button, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from 'expo-router';
import TextButton from '../components/buttons/TextButton';
import { COLORS, FONTS, SIZES } from '../constants/Theme';

export default function index() {
  const navigation = useNavigation();

  const handleNavigateToTabs = () => {
    navigation.navigate('index' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Sorry, this page does not exist.</Text>
      <TextButton text='Go back to Home' onPress={handleNavigateToTabs} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    width: SIZES.width,
    height: SIZES.height,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: SIZES.paddingHorizontal,
  },
  header: {
    ...FONTS.h1,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 20,
  },
});
