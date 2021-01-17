import * as Sentry from '@sentry/react-native';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {name as appName} from './app.json';
import {App} from './src';

if (!__DEV__) {
  Sentry.init({
    dsn:
      'https://51bfad8d9ea84fca949cb02bf668f0a7@o506338.ingest.sentry.io/5595909',
  });
}

AppRegistry.registerComponent(appName, () => App);
