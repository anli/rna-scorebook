import Navigation from '@navigation';
import store, {persistor} from '@store';
import React, {useEffect} from 'react';
import {Alert, BackHandler, Linking, StatusBar} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import VersionCheck from 'react-native-version-check';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {TourGuideProvider} from 'rn-tourguide';
import colors from './theme/colors';

const theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
  },
};

const App = () => {
  useEffect(() => {
    const init = async () => {
      checkUpdateNeeded();
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);

  const checkUpdateNeeded = async () => {
    try {
      let updateNeeded = await VersionCheck.needUpdate({depth: 1});
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
          <TourGuideProvider verticalOffset={StatusBar.currentHeight}>
            <Navigation />
          </TourGuideProvider>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
