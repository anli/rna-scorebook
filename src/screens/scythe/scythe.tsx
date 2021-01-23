import {BackButton, Player, ScoringCategory, ScoringConfig} from '@components';
import analytics from '@react-native-firebase/analytics';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {ScytheData, ScytheSelectors, scytheSlice} from '@scythe';
import {format} from 'date-fns';
import R from 'ramda';
import React, {useRef, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Appbar, Caption, Headline} from 'react-native-paper';
import {Host, Portal} from 'react-native-portalize';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';

const Component = () => {
  const game = ScytheData.game;
  const selectedPlayerId = useSelector(ScytheSelectors.selectedPlayerId);
  const players = useSelector(ScytheSelectors.players);
  const scoringCategories = useSelector(ScytheSelectors.scoringCategories);
  const scoringConfigRef = useRef<Modalize>(null);
  const [selected, setSelected] = useState<
    {id: string; config: any} | undefined
  >(undefined);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const startDate = useSelector(ScytheSelectors.startDate);
  const rankings = useSelector(ScytheSelectors.rankings);
  const summaryHeader = useSelector(ScytheSelectors.summaryHeaders);

  const selectedPlayer = R.find(R.propEq('id', selectedPlayerId), players) as {
    id: string;
    name: string;
  };
  const scoreConfig = selected?.config;

  const onSelectScoringCategory = async (id: string, config: any) => {
    await setSelected({id, config});
    scoringConfigRef.current?.open();
  };

  const onSelectScoringConfig = (value: string) => {
    const scoreCategoryId = selected?.id as string;
    dispatch(scytheSlice.actions.setScore({value, scoreCategoryId}));
    scoringConfigRef.current?.close();
  };

  const onAddPlayer = () => {
    const type = scytheSlice.actions.addPlayer.type;
    navigation.navigate('PlayerAddScreen', {type});
  };

  const onSelectPlayer = (id: string) => {
    dispatch(scytheSlice.actions.selectPlayer(id));
  };
  const onRemoveSelectedPlayer = () => {
    dispatch(scytheSlice.actions.removeSelectedPlayer());
  };

  const onUpdateSelectedPlayer = () => {
    const {id, name} = selectedPlayer;
    const actionType = scytheSlice.actions.updatePlayer.type;
    navigation.navigate('PlayerUpdateScreen', {id, name, type: actionType});
  };

  const onReset = () => {
    Alert.alert('Confirm Reset game?', 'You cannot undo this.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => dispatch(scytheSlice.actions.start())},
    ]);
    dispatch(scytheSlice.actions.start());
  };

  const onSummary = async () => {
    await analytics().logEvent('game_summary');
    navigation.navigate('SummaryScreen', {
      startDate,
      gameName: game.name,
      playerRankings: rankings,
      headers: summaryHeader,
    });
  };

  return (
    <Host>
      <Screen>
        <AppBarHeader>
          <BackButton icon="close" />
          <Appbar.Content title="" />
          <>
            <Appbar.Action
              testID="ResetButton"
              icon="restart"
              onPress={onReset}
            />
            <Appbar.Action
              testID="RemoveSelectedPlayerButton"
              icon="account-cancel"
              disabled={selectedPlayerId === 'ME'}
              onPress={onRemoveSelectedPlayer}
            />
            <Appbar.Action
              testID="UpdateSelectedPlayerButton"
              icon="account-details"
              onPress={onUpdateSelectedPlayer}
            />
            <Appbar.Action
              testID="SummaryButton"
              icon="poll"
              onPress={onSummary}
            />
          </>
        </AppBarHeader>
        <Game>
          <Headline>{game.name}</Headline>
          <Caption>{startDate ? format(startDate, 'd LLL yyyy') : '-'}</Caption>
        </Game>
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
            {players?.map(({id, name, totalScore}) => (
              <Player
                key={id}
                name={name}
                score={totalScore}
                color="white"
                selected={id === selectedPlayerId}
                testID={`SelectPlayerButton.${id}`}
                onPress={() => onSelectPlayer(id)}
              />
            ))}
            <EndingPlayer />
          </Players>
        </View>
        <ScoringCategories>
          {scoringCategories?.map(({name, value, id, config, isBlock}) => (
            <TouchableOpacity
              disabled={isBlock}
              testID={`ScoringCategoryButton.${id}`}
              key={id}
              onPress={() => onSelectScoringCategory(id, config)}>
              <ScoringCategory name={name} value={value} disabled={isBlock} />
            </TouchableOpacity>
          ))}
        </ScoringCategories>
        <Portal>
          <Modalize ref={scoringConfigRef} adjustToContentHeight>
            {Boolean(scoreConfig) && (
              <ScoringConfig
                testID="ScoringConfig"
                question={scoreConfig.question}
                options={scoreConfig.options}
                onPress={onSelectScoringConfig}
              />
            )}
          </Modalize>
        </Portal>
      </Screen>
    </Host>
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
`;

const EndingPlayer = styled.View`
  width: 40px;
`;

const ScoringCategories = styled.View`
  margin-top: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

const Game = styled.View`
  padding-left: 28px;
  padding-right: 28px;
`;
