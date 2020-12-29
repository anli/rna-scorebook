import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import {Appbar, List} from 'react-native-paper';
import styled from 'styled-components/native';

const Component = () => {
  const version = deviceInfoModule.getVersion();
  return (
    <View>
      <AppBarHeader>
        <Appbar.Content title="Settings" />
      </AppBarHeader>

      <List.Item title="Version" description={version} />
    </View>
  );
};

const options = {
  headerShown: false,
};

export default class SettingScreen {
  static Component: () => JSX.Element = Component;
  static options: StackNavigationOptions = options;
}

const AppBarHeader = styled(Appbar.Header)`
  background-color: transparent;
`;
