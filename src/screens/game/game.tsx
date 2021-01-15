import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import styled from 'styled-components/native';
import MenuItem from './menu-item';
import Player from './player';
import RoundsNative from './rounds';

const type = {name: 'Sushi Go Party!'};
const players = [{id: 'ME', name: 'ME', totalScore: '0'}];
const selectedPlayerId = 'ME';
const roundOneScores = [
  {
    id: 'eggNigiri',
    name: 'EGG NIGIRI',
    score: '6',
  },
  {
    id: 'salmonNigiri',
    name: 'SALMON NIGIRI',
    score: '2',
  },
  {
    id: 'squidNigiri',
    name: 'SQUID NIGIRI',
    score: '0',
  },
  {
    id: 'temaki',
    name: 'TEMAKI',
    score: '6',
  },
  {
    id: 'soySauce',
    name: 'SOY SAUCE',
  },
  {
    id: 'wasabi',
    name: 'WASABI',
  },
  {
    id: 'onigiri',
    name: 'ONIGIRI',
  },
  {
    id: 'edamame',
    name: 'EDAMAME',
  },
  {
    id: 'tempura',
    name: 'TEMPURA',
  },
];
const roundTwoScores = roundOneScores;
const roundThreeScores = roundOneScores;

const Component = () => {
  const navigation = useNavigation();

  const onAddPlayer = () => {
    navigation.navigate('PlayerAddScreen');
  };

  return (
    <Screen>
      <AppBarHeader>
        <Appbar.Content title={type.name} />
      </AppBarHeader>
      <View>
        <Players horizontal showsHorizontalScrollIndicator={false}>
          <Player
            key="new-player"
            name="Add"
            score="+"
            color="white"
            selected={false}
            testID="AddPlayerButton"
            onPress={onAddPlayer}
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
      </View>
      <Rounds
        data={[roundOneScores, roundTwoScores, roundThreeScores]}
        render={(roundData) => {
          return (
            <Screen>
              <MenuItems>
                {roundData?.map(({name, score, id}) => (
                  <MenuItem key={id} name={name} score={score} />
                ))}
              </MenuItems>
            </Screen>
          );
        }}
      />
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
  margin-left: 16px;
  background-color: transparent;
`;

const Players = styled.ScrollView`
  padding-left: 20px;
  padding-right: 20px;
`;

const Rounds = styled(RoundsNative)`
  flex: 1;
`;

const MenuItems = styled.View`
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
`;
