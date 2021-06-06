import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens/Login';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes(): JSX.Element {
  return (
    <Navigator headerMode="none">
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}
