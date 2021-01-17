import {BackButton} from '@components';
import {StackNavigationOptions} from '@react-navigation/stack';
import {GameSelectors} from '@store';
import React from 'react';
import {View} from 'react-native';
import {Appbar, DataTable, Headline} from 'react-native-paper';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Player from './player';

const Component = () => {
  const playerRankings = useSelector(GameSelectors.playerRankings);

  const topThreePlayers = [
    playerRankings[1],
    playerRankings[0],
    playerRankings[2],
  ];

  return (
    <>
      <View>
        <AppBarHeader>
          <BackButton icon="arrow-left" />
        </AppBarHeader>
      </View>

      <Title>Top Sushi Go-ers!</Title>

      <TopThreePlayers>
        {topThreePlayers.map((player) => {
          if (player) {
            const {rank, name, totalScore, id} = player;
            return (
              <Player
                testID={`TopThreePlayer.${name}`}
                key={id}
                rank={rank}
                name={name}
                score={totalScore}
                color="white"
              />
            );
          }
        })}
      </TopThreePlayers>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Player</DataTable.Title>
          <DataTable.Title numeric>1</DataTable.Title>
          <DataTable.Title numeric>2</DataTable.Title>
          <DataTable.Title numeric>3</DataTable.Title>
          <DataTable.Title numeric>Total</DataTable.Title>
        </DataTable.Header>

        {playerRankings.map(
          ({id, name, totalScore, round1Score, round2Score, round3Score}) => {
            return (
              <DataTable.Row key={id}>
                <DataTable.Cell>{name}</DataTable.Cell>
                <DataTable.Cell numeric>{round1Score}</DataTable.Cell>
                <DataTable.Cell numeric>{round2Score}</DataTable.Cell>
                <DataTable.Cell numeric>{round3Score}</DataTable.Cell>
                <DataTable.Cell numeric>{totalScore}</DataTable.Cell>
              </DataTable.Row>
            );
          },
        )}
      </DataTable>
    </>
  );
};

const options = {
  headerShown: false,
};

export default class SummaryScreen {
  static Component: () => JSX.Element = Component;
  static options: StackNavigationOptions = options;
}

const AppBarHeader = styled(Appbar.Header)`
  background-color: transparent;
`;

const TopThreePlayers = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

const Title = styled(Headline)`
  margin-bottom: 8px;
  align-self: center;
`;
