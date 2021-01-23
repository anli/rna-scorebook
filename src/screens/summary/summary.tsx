import {BackButton} from '@components';
import analytics from '@react-native-firebase/analytics';
import {useRoute} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {colors} from '@theme';
import {format} from 'date-fns';
import React, {useRef} from 'react';
import {Alert, View} from 'react-native';
import {Appbar, Caption, DataTable, Headline} from 'react-native-paper';
import Share from 'react-native-share';
import NativeViewShot, {captureRef} from 'react-native-view-shot';
import styled from 'styled-components/native';
import Player from './player';

type Params = {
  startDate: number;
  gameName: string;
  playerRankings: {
    id: string;
    name: string;
    rank: number;
    totalScore: string;
    categories: {name: string; value: string; isNumeric?: boolean}[];
  }[];
  headers: {
    title: string;
    isNumeric?: boolean;
  }[];
};
const Component = () => {
  const summaryRef = useRef<any>(null);
  const {
    params: {startDate, gameName, playerRankings, headers},
  }: {
    params: Params;
  } = useRoute<any>();

  const startDateLabel = startDate ? format(startDate, 'd LLL yyyy') : '-';

  const topThreePlayers = [
    playerRankings[1],
    playerRankings[0],
    playerRankings[2],
  ];

  /* istanbul ignore next */
  const onShare = async () => {
    const snapshot = await captureRef(summaryRef, {
      result: 'data-uri',
      format: 'png',
      quality: 1,
    });

    const options = {
      title: 'title',
      message: 'message',
      url: snapshot,
      failOnCancel: false,
    };
    try {
      await analytics().logEvent('summary_share');
      await Share.open(options);
    } catch {
      Alert.alert('Oops', 'Something went wrong');
    }
  };

  return (
    <Screen>
      <View>
        <AppBarHeader>
          <BackButton icon="arrow-left" />
          <Appbar.Content title="" subtitle="" />
          <>
            <Appbar.Action
              testID="ShareButton"
              icon="share"
              onPress={onShare}
            />
          </>
        </AppBarHeader>
      </View>

      <ViewShot ref={summaryRef}>
        <Title>Best of {gameName}</Title>
        <Subtitle>{startDateLabel}</Subtitle>

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
                />
              );
            }
          })}
        </TopThreePlayers>

        <DataTable>
          <DataTable.Header>
            {headers.map(({title, isNumeric = false}) => (
              <DataTable.Title key={title} numeric={isNumeric}>
                {title}
              </DataTable.Title>
            ))}
          </DataTable.Header>

          {playerRankings.map(({id, name, totalScore, categories}) => {
            return (
              <DataTable.Row key={id}>
                <DataTable.Cell>{name}</DataTable.Cell>
                {categories.map(
                  ({name: categoryName, value, isNumeric = false}) => (
                    <DataTable.Cell key={categoryName} numeric={isNumeric}>
                      {value !== '0' ? value : ''}
                    </DataTable.Cell>
                  ),
                )}
                <DataTable.Cell numeric>{totalScore}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </ViewShot>
    </Screen>
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
  align-self: center;
`;

const Screen = styled.SafeAreaView`
  flex: 1;
`;

const ViewShot = styled(NativeViewShot)`
  background-color: ${colors.background};
`;

const Subtitle = styled(Caption)`
  margin-bottom: 8px;
  align-self: center;
`;
