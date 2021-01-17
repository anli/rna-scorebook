import Navigation from '@navigation';
import store, {persistor} from '@store';
import React, {useEffect} from 'react';
import {Alert, BackHandler, Linking, StatusBar} from 'react-native';
import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import VersionCheck from 'react-native-version-check';
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
  useEffect(() => {
    checkUpdateNeeded();
  }, []);

  const checkUpdateNeeded = async () => {
    try {
      let updateNeeded = await VersionCheck.needUpdate();
      if (updateNeeded.isNeeded) {
        Alert.alert(
          'Please update',
          'You will have to update your app to the latest version to continue using.',
          [
            {
              text: 'Update',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(updateNeeded.storeUrl);
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch {}
  };

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
