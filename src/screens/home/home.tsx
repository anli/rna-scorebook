import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';

const Component = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

const options = {
  headerShown: false,
};

export default class HomeScreen {
  static Component: () => JSX.Element = Component;
  static options: StackNavigationOptions = options;
}
