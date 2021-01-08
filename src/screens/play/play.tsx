import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import store, {PlaySelectors, playSlice} from '@store';
import {colors} from '@theme';
import R from 'ramda';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Appbar, FAB, IconButton, List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Player from './player';
import Rounds from './rounds';

const Component = () => {
  const navigation = useNavigation();
  const menuItems = useSelector(PlaySelectors.menuItems);
  const playersMap = useSelector(PlaySelectors.playersMap);
  const totalScoreMap: {[key: string]: number} = useSelector(
    PlaySelectors.totalScoreMap,
  );
  const scoresMap = useSelector(PlaySelectors.scoresMap);
  const roundsTotalScoreMap: {[key: string]: any} = useSelector(
    PlaySelectors.roundsTotalScoreMap,
  );
  const selectedPlayer = useSelector(PlaySelectors.selectedPlayer);
  const [roundId, setRoundId] = useState<string>('roundOne');

  useEffect(() => {
    const hasExactlyOnePlayer = Object.keys(playersMap).length === 1;
    if (hasExactlyOnePlayer) {
      store.dispatch(
        playSlice.actions.selectPlayer(
          R.head(Object.keys(playersMap)) as string,
        ),
      );
      return;
    }
  }, [playersMap]);

  const start = () => {
    navigation.navigate('PlayerAddScreen');
  };

  const hasGame = !R.isEmpty(menuItems) && !R.isEmpty(playersMap);
  const players = Object.keys(playersMap).map((playerName) => ({
    id: playerName,
    name: playerName,
    color: 'white',
  }));

  const rounds = [
    {
      id: 'roundOne',
      name: 'Round 1',
      score: roundsTotalScoreMap?.[selectedPlayer]?.['roundOne'] || 0,
    },
    {
      id: 'roundTwo',
      name: 'Round 2',
      score: roundsTotalScoreMap?.[selectedPlayer]?.['roundTwo'] || 0,
    },
    {
      id: 'roundThree',
      name: 'Round 3',
      score: roundsTotalScoreMap?.[selectedPlayer]?.['roundThree'] || 0,
    },
  ];
  roundsTotalScoreMap;

  const onRoundChange = ({id}: {id: string}) => {
    setRoundId(id);
  };

  const onAdjustScore = (
    menuItemId: string,
    currentRoundId: string,
    adjustment: number,
    player: string,
  ) => {
    store.dispatch(
      playSlice.actions.adjustScore({
        roundId: currentRoundId,
        menuItemId,
        adjustment,
        player,
      }),
    );
  };

  const onReset = () => {
    Alert.alert('Start Over?', 'You cannot undo this.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          store.dispatch(playSlice.actions.reset());
        },
      },
    ]);
  };

  const onAddPlayer = () => {
    navigation.navigate('PlayerAddScreen', {mode: 'ADD_ONLY'});
  };

  const onSelectPlayer = (id: string) => {
    store.dispatch(playSlice.actions.selectPlayer(id));
  };

  const onDeleteSelectedPlayer = () => {
    if (players.length > 1) {
      return Alert.alert(`Remove ${selectedPlayer}?`, 'You cannot undo this.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            store.dispatch(playSlice.actions.deletePlayer(selectedPlayer)),
        },
      ]);
    }
    return onReset();
  };

  return (
    <Screen>
      {hasGame && (
        <>
          <AppBarHeader>
            <Appbar.Content title="Sushi Go Party!" />
            <Appbar.Action
              testID="ResetButton"
              icon="undo-variant"
              onPress={onReset}
            />
          </AppBarHeader>

          <View>
            <Players horizontal showsHorizontalScrollIndicator={false}>
              <Player
                key="new-player"
                name="Add"
                score="+"
                color="white"
                selected={false}
                onPress={onAddPlayer}
                testID="AddPlayerButton"
              />
              {players.map(({id, name, color}) => (
                <Player
                  key={id}
                  name={name}
                  score={totalScoreMap?.[id]}
                  color={color}
                  selected={id === selectedPlayer}
                  onPress={() => onSelectPlayer(id)}
                  testID={`SelectPlayerButton.${id}`}
                />
              ))}
            </Players>
          </View>

          <Body showsVerticalScrollIndicator={false}>
            <SelectedPlayer
              testID="SelectedPlayer"
              title={selectedPlayer}
              right={() => (
                <Buttons>
                  <IconButton
                    testID="SelectedPlayer.DeleteButton"
                    icon="delete"
                    onPress={onDeleteSelectedPlayer}
                  />
                </Buttons>
              )}
            />
            <Rounds data={rounds} testID="Round" onChange={onRoundChange} />
            {menuItems.map(({id: menuItemId, name}) => {
              const score =
                scoresMap?.[selectedPlayer]?.[roundId]?.[menuItemId] || 0;
              return (
                <MenuItem
                  key={menuItemId}
                  title={`${name} (${score} pts)`}
                  right={() => (
                    <Buttons>
                      <IconButton
                        testID={`${menuItemId}.MinusButton`}
                        icon="minus"
                        onPress={() =>
                          onAdjustScore(
                            menuItemId,
                            roundId,
                            -getIncrement(menuItemId),
                            selectedPlayer,
                          )
                        }
                      />
                      <IconButton
                        testID={`${menuItemId}.AddButton`}
                        icon="plus"
                        onPress={() =>
                          onAdjustScore(
                            menuItemId,
                            roundId,
                            +getIncrement(menuItemId),
                            selectedPlayer,
                          )
                        }
                      />
                    </Buttons>
                  )}
                />
              );
            })}
          </Body>
        </>
      )}
      {!hasGame && (
        <StartButton testID="StartButton" icon="plus" onPress={start} />
      )}
    </Screen>
  );
};

const options = {
  headerShown: false,
};

export default class PlayScreen {
  static Component: () => JSX.Element = Component;
  static options: StackNavigationOptions = options;
}

const Screen = styled.SafeAreaView`
  flex: 1;
`;

const StartButton = styled(FAB)`
  position: absolute;
  margin: 24px 24px 24px 24px;
  right: 0px;
  bottom: 0px;
  background-color: ${colors.primary};
`;

const AppBarHeader = styled(Appbar.Header)`
  padding-left: 10px;
  padding-right: 10px;
  background-color: transparent;
`;

const Players = styled.ScrollView`
  padding-left: 12px;
`;

const Body = styled.ScrollView`
  flex: 1;
`;

const MenuItem = styled(List.Item)`
  padding-left: 16px;
  padding-right: 24px;
`;

const Buttons = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const SelectedPlayer = styled(List.Item)`
  padding-left: 16px;
  padding-right: 24px;
`;

const menuItemsIncrementMap: {[key: string]: number} = {
  eggNigiri: 1,
  salmonNigiri: 2,
  squidNigiri: 3,
  sashimi: 10,
  tempura: 5,
};

const getIncrement = (menuItemId: string) => {
  return menuItemsIncrementMap?.[menuItemId] || 1;
};
