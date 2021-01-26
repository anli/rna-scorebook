import {SessionSelectors, sessionSlice} from '@game';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {Alert, Linking, View} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import {Appbar, List} from 'react-native-paper';
import VersionCheck from 'react-native-version-check';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';

const Component = () => {
  const version = deviceInfoModule.getVersion();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const game = useSelector(SessionSelectors.game);
  const currentGameId = game?.id;

  const onReview = async () => {
    const url = await VersionCheck.getStoreUrl();
    Linking.openURL(url);
  };

  const onStartGame = (gameId: any) => {
    if (currentGameId) {
      if (currentGameId !== gameId) {
        return Alert.alert(
          'Proceed with a new Game?',
          'You will lose your existing game.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                dispatch(sessionSlice.actions.start(gameId));
                return navigation.navigate('SessionScreen');
              },
            },
          ],
        );
      }

      return navigation.navigate('SessionScreen');
    }

    dispatch(sessionSlice.actions.start(gameId));
    return navigation.navigate('SessionScreen');
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
      onPress: () => onStartGame('scythe'),
    },
    {
      icon: 'beta',
      title: 'Scorebook for Sushi Go Party!',
      description: 'For testing only',
      onPress: () => onStartGame('sushiGoParty'),
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
