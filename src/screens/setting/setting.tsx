import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {Linking, View} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import {Appbar, List} from 'react-native-paper';
import VersionCheck from 'react-native-version-check';
import styled from 'styled-components/native';

const Component = () => {
  const version = deviceInfoModule.getVersion();

  const onReview = async () => {
    const url = await VersionCheck.getStoreUrl();
    Linking.openURL(url);
  };

  return (
    <>
      <View>
        <AppBarHeader>
          <Appbar.Content title="Settings" />
        </AppBarHeader>

        <List.Item
          left={(props) => <List.Icon {...props} icon="alert-circle" />}
          title="Version"
          description={version}
        />

        <List.Item
          left={(props) => <List.Icon {...props} icon="heart" />}
          title="Send a feedback or review"
          description="Thank you for your support!"
          onPress={onReview}
        />
      </View>
    </>
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
