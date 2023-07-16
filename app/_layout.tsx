import { useNavigation, Stack } from 'expo-router';
import { useEffect, useState } from 'react';

import * as Font from 'expo-font';
import store from '../store';
import { Provider } from 'react-redux';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'Roboto-ExtraBold': require('../assets/fonts/Roboto-ExtraBold.ttf'),
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error('Error loading fonts:', error);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='[...missing]' options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
