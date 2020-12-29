import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {PlayScreen, SettingScreen} from '@screens';
import {colors} from '@theme';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={BottomTab.Component}
            options={BottomTab.options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

const Tab = createBottomTabNavigator();

const BottomTabComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName="Play"
      tabBarOptions={{showLabel: false, activeTintColor: colors.primary}}>
      <Tab.Screen
        name="Play"
        component={PlayScreen.Component}
        options={getTabScreenOptions('gamepad-variant', PlayScreen.options)}
      />
      <Tab.Screen
        name="Settings"
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
