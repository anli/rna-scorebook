import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {
  MenuAddScreen,
  PlayerAddScreen,
  PlayScreen,
  SettingScreen,
} from '@screens';
import store, {persistor} from '@store';
import {colors} from '@theme';
import React from 'react';
import {StatusBar} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {Host} from 'react-native-portalize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
  },
};

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useDarkMode();

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <StatusBar
            backgroundColor={isDarkMode ? 'black' : 'white'}
            barStyle={isDarkMode ? 'light-content' : 'light-content'}
          />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="BottomTab"
                component={BottomTab.Component}
                options={BottomTab.options}
              />
              <Stack.Screen
                name="PlayerAddScreen"
                component={PlayerAddScreen.Component}
                options={PlayerAddScreen.options}
              />
              <Stack.Screen
                name="MenuAddScreen"
                component={MenuAddScreen.Component}
                options={MenuAddScreen.options}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;

const Tab = createBottomTabNavigator();

const BottomTabComponent = () => {
  return (
    <Host>
      <Tab.Navigator
        initialRouteName="PlayScreen"
        tabBarOptions={{showLabel: false, activeTintColor: colors.primary}}>
        <Tab.Screen
          name="PlayScreen"
          component={PlayScreen.Component}
          options={getTabScreenOptions('gamepad-variant', PlayScreen.options)}
        />
        <Tab.Screen
          name="SettingScreen"
          component={SettingScreen.Component}
          options={getTabScreenOptions('cog', SettingScreen.options)}
        />
      </Tab.Navigator>
    </Host>
  );
};

const BottomTabOptions = {
  headerShown: false,
};

class BottomTab {
  static Component: () => JSX.Element = BottomTabComponent;
  static options: StackNavigationOptions = BottomTabOptions;
}

const getTabScreenOptions = (icon: string, options: any) => {
  return {
    tabBarIcon: ({color, size}: {color: string; size: number}) => (
      <MaterialCommunityIcons name={icon} color={color} size={size} />
    ),
    ...options,
  };
};
