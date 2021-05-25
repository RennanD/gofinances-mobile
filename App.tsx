import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Dashboard } from './src/screens/Dashboard';

import theme from './src/global/styles/theme';

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
