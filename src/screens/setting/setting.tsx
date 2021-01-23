import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {ScytheSelectors, scytheSlice} from '@scythe';
import React from 'react';
import {Linking, View} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import {Appbar, List} from 'react-native-paper';
import VersionCheck from 'react-native-version-check';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';

const Component = () => {
  const version = deviceInfoModule.getVersion();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scythePlayers = useSelector(ScytheSelectors.players);

  const onReview = async () => {
    const url = await VersionCheck.getStoreUrl();
    Linking.openURL(url);
  };

  const onScythe = () => {
    const hasExistingScytheGame = scythePlayers.length !== 0;
    !hasExistingScytheGame && dispatch(scytheSlice.actions.start());
    navigation.navigate('ScytheScreen');
  };

  const items = [
    {
      icon: 'heart',
      title: 'Send a feedback or review',
      description: 'Thank you for your support!',
      onPress: onReview,
    },
    {
      icon: 'beta',
      title: 'Scorebook for Scythe',
      description: 'Try out our next beta feature',
      onPress: onScythe,
    },
  ];

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

        {items.map(({icon, title, description, onPress}) => (
          <List.Item
            key={title}
            left={(props) => <List.Icon {...props} icon={icon} />}
            title={title}
            description={description}
            onPress={onPress}
          />
        ))}
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
