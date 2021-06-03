import 'react-native-gesture-handler';
import 'intl';

import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StatusBar } from 'react-native';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { ThemeProvider } from 'styled-components';

import { NavigationContainer } from '@react-navigation/native';

// import { Dashboard } from './src/screens/Dashboard';

import theme from './src/global/styles/theme';
import { AppRoutes } from './src/routes/app.routes';
import { Login } from './src/screens/Login';

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Login />
      </NavigationContainer>
    </ThemeProvider>
  );
}
