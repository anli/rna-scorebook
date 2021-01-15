import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  GameScreen,
  MenuAddScreen,
  PlayerAddScreen,
  PlayScreen,
  SettingScreen,
  StartScreen,
} from '@screens';
import {colors} from '@theme';
import React from 'react';
import {View} from 'react-native';
import {Host} from 'react-native-portalize';
import getTabScreenOptions from './get-tab-screen-options';

const PlaceholderComponent = () => <View />;
const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <Host>
    <AppTabs.Navigator
      initialRouteName="GameScreen"
      tabBarOptions={{showLabel: false, activeTintColor: colors.primary}}>
      <AppTabs.Screen
        name="GameScreen"
        component={GameScreen.Component}
        options={getTabScreenOptions('gamepad-variant', GameScreen.options)}
      />
      <AppTabs.Screen
        name="Create"
        component={PlaceholderComponent}
        options={getTabScreenOptions('plus-box-outline', PlayScreen.options)}
        listeners={({navigation}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('StartScreen');
          },
        })}
      />
      <AppTabs.Screen
        name="SettingScreen"
        component={SettingScreen.Component}
        options={getTabScreenOptions('cog', SettingScreen.options)}
      />
    </AppTabs.Navigator>
  </Host>
);

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  return (
    <RootStack.Navigator headerMode="none" mode="modal">
      <RootStack.Screen name="AppTabsScreen" component={AppTabsScreen} />
      <RootStack.Screen
        name="StartScreen"
        component={StartScreen.Component}
        options={StartScreen.options}
      />
      <RootStack.Screen
        name="MenuAddScreen"
        component={MenuAddScreen.Component}
        options={MenuAddScreen.options}
      />
      <RootStack.Screen
        name="PlayerAddScreen"
        component={PlayerAddScreen.Component}
        options={PlayerAddScreen.options}
      />
    </RootStack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
