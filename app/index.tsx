import { SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { useNavigation } from 'expo-router';
import TextButton from '../components/buttons/TextButton';
import { COLORS, FONTS, SIZES } from '../constants/Theme';

export default function index() {
  const navigation = useNavigation();

  const handleNavigateToTabs = () => {
    navigation.navigate('(tabs)' as never, { screen: 'Market' } as never);
  };

  return (
    <ImageBackground source={require('../assets/images/splash.png')}>
      <SafeAreaView style={styles.container}>
        <TextButton
          text='Access the Stock APP'
          onPress={handleNavigateToTabs}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    i: 'URL(../../assets/images/splash.png)',
    width: SIZES.width,
    height: '100%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '80%',

    paddingHorizontal: SIZES.paddingHorizontal,
  },
  header: {
    ...FONTS.h1,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 20,
  },
});
