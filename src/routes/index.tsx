import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AppLoading from 'expo-app-loading';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

import { useAuth } from '../hooks/auth';

export function Routes(): JSX.Element {
  const { user, userStoragedLoading } = useAuth();

  if (userStoragedLoading) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
