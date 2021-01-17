import analytics from '@react-native-firebase/analytics';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  GameScreen,
  MenuAddScreen,
  PlayerAddScreen,
  PlayerUpdateScreen,
  SettingScreen,
  StartScreen,
  SummaryScreen,
} from '@screens';
import {colors} from '@theme';
import React, {useRef, useState} from 'react';
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
        options={getTabScreenOptions('plus-box-outline', {})}
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
    <RootStack.Navigator
      headerMode="none"
      mode="modal"
      initialRouteName="AppTabsScreen">
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
      <RootStack.Screen
        name="PlayerUpdateScreen"
        component={PlayerUpdateScreen.Component}
        options={PlayerUpdateScreen.options}
      />
      <RootStack.Screen
        name="SummaryScreen"
        component={SummaryScreen.Component}
        options={SummaryScreen.options}
      />
    </RootStack.Navigator>
  );
};

const Navigation = () => {
  const [routeName, setRouteName] = useState<string>();
  const navigationRef = useRef<NavigationContainerRef>(null);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        const currentRouteName = (navigationRef.current as any).getCurrentRoute()
          .name;

        setRouteName(currentRouteName);
      }}
      onStateChange={async () => {
        const previousRouteName = routeName;
        const currentRouteName = (navigationRef.current as any).getCurrentRoute()
          .name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }

        setRouteName(currentRouteName);
      }}>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
