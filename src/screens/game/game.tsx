import {BackButton} from '@components';
import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {Appbar} from 'react-native-paper';
import styled from 'styled-components/native';
import Player from './player';

const type = {name: 'Sushi Go Party!'};
const players = [{id: 'ME', name: 'ME', totalScore: '0'}];
const selectedPlayerId = 'ME';

const Component = () => {
  return (
    <Screen>
      <AppBarHeader>
        <BackButton icon="close" />
        <Appbar.Content title={type.name} />
      </AppBarHeader>
      <Players horizontal showsHorizontalScrollIndicator={false}>
        <Player
          key="new-player"
          name="Add"
          score="+"
          color="white"
          selected={false}
          onPress={() => {}}
          testID="AddPlayerButton"
        />
        {players.map(({id, name, totalScore}) => (
          <Player
            key={id}
            name={name}
            score={totalScore}
            color="white"
            selected={id === selectedPlayerId}
            onPress={() => {}}
            testID={`SelectPlayerButton.${id}`}
          />
        ))}
      </Players>
    </Screen>
  );
};

const options = {
  headerShown: false,
};

export default class GameScreen {
  static Component: () => JSX.Element = Component;
  static options: StackNavigationOptions = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
`;

const AppBarHeader = styled(Appbar.Header)`
  background-color: transparent;
`;

const Players = styled.ScrollView`
  padding-left: 12px;
  padding-right: 12px;
`;
