import Navigation from '@navigation';
import store, {persistor} from '@store';
import React from 'react';
import {StatusBar} from 'react-native';
import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import colors from './theme/colors';

const theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
  },
};

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <StatusBar
            backgroundColor={colors.background}
            barStyle="dark-content"
          />
          <Navigation />
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
