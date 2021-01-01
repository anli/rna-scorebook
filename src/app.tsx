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
import store from '@store';
import {colors} from '@theme';
import React from 'react';
import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider as ReduxProvider} from 'react-redux';
const theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
  },
};
const Stack = createStackNavigator();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
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
    </ReduxProvider>
  );
};

export default App;

const Tab = createBottomTabNavigator();

const BottomTabComponent = () => {
  return (
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
