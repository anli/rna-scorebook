import {StackNavigationOptions} from '@react-navigation/stack';
import store, {UserSelectors, userSlice} from '@store';
import React from 'react';
import {View} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import {Appbar, List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import DefaultNameDialog, {useDefaultNameDialog} from './default-name-dialog';

const Component = () => {
  const version = deviceInfoModule.getVersion();
  const defaultName = useSelector(UserSelectors.defaultName);
  const {visible, dismiss, show} = useDefaultNameDialog();

  const onSetDefaultName = async ({
    defaultName: newDefaultName,
  }: {
    defaultName: string;
  }) => {
    store.dispatch(userSlice.actions.setDefaultName(newDefaultName));
    dismiss();
  };

  const onClear = async () => {
    store.dispatch(userSlice.actions.setDefaultName(undefined));
    dismiss();
  };

  return (
    <>
      <View>
        <AppBarHeader>
          <Appbar.Content title="Settings" />
        </AppBarHeader>

        <List.Item title="Version" description={version} />
        <List.Item
          title="Default Name"
          description={defaultName || 'Setup one now'}
          onPress={show}
        />
      </View>
      <DefaultNameDialog
        testID="DefaultNameDialog"
        visible={visible}
        onDismiss={dismiss}
        onConfirm={onSetDefaultName}
        onClear={onClear}
      />
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
