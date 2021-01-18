import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// https://github.com/react-native-device-info/react-native-device-info#troubleshooting
jest.mock('react-native-device-info', () => mockRNDeviceInfo);

// https://react-hook-form.com/advanced-usage#TestingForm
global.window = {};
global.window = global;

// https://react-native-async-storage.github.io/async-storage/docs/advanced/jest/
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// https://github.com/rt2zz/redux-persist/issues/1243
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

// https://stackoverflow.com/questions/62616187/spyon-react-native-firebase-analytics-methods
jest.mock('@react-native-firebase/analytics', () => {
  return jest
    .fn()
    .mockReturnValue({logScreenView: jest.fn(), logEvent: jest.fn()});
});

// https://react-native-share.github.io/react-native-share/docs/testing
jest.mock('react-native-share', () => ({
  default: jest.fn(),
}));

// https://github.com/MinaSamir11/react-native-in-app-review#how-to-test-your-code
jest.mock('react-native-in-app-review', () => ({
  RequestInAppReview: jest.fn(),
  isAvailable: jest.fn().mockReturnValue(true),
  // add more methods as needed
}));

jest.mock('react-native-version-check', () => ({
  getStoreUrl: jest.fn().mockResolvedValue('STORE_URL'),
}));
