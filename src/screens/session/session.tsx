import {BackButton, Player, ScoringCategory, ScoringConfig} from '@components';
import {SessionSelectors, sessionSlice} from '@game';
import analytics from '@react-native-firebase/analytics';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {format} from 'date-fns';
import R from 'ramda';
import React, {useRef, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Appbar, Caption, Headline} from 'react-native-paper';
import {Host, Portal} from 'react-native-portalize';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';

const Component = () => {
  const game = useSelector(SessionSelectors.game);
  const selectedPlayerId = useSelector(SessionSelectors.selectedPlayerId);
  const players = useSelector(SessionSelectors.players);
  const scoringCategories = useSelector(SessionSelectors.scoringCategories);
  const scoringConfigRef = useRef<Modalize>(null);
  const [selected, setSelected] = useState<
    {id: string; config: any} | undefined
  >(undefined);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const startDate = useSelector(SessionSelectors.startDate);
  const rankings = useSelector(SessionSelectors.rankings);
  const summaryHeader = useSelector(SessionSelectors.summaryHeaders);

  const selectedPlayer = R.find(R.propEq('id', selectedPlayerId), players) as {
    id: string;
    name: string;
  };
  const scoreConfig = selected?.config;
  const columnsCount = scoringCategories.length > 8 ? 3 : 2;

  const onSelectScoringCategory = async (id: string, config: any) => {
    await setSelected({id, config});
    scoringConfigRef.current?.open();
  };

  const onSelectScoringConfig = (value: string) => {
    const scoreCategoryId = selected?.id as string;
    dispatch(sessionSlice.actions.setScore({value, scoreCategoryId}));
    scoringConfigRef.current?.close();
  };

  const onAddPlayer = () => {
    const type = sessionSlice.actions.addPlayer.type;
    navigation.navigate('PlayerAddScreen', {type});
  };

  const onSelectPlayer = (id: string) => {
    dispatch(sessionSlice.actions.selectPlayer(id));
  };
  const onRemoveSelectedPlayer = () => {
    dispatch(sessionSlice.actions.removeSelectedPlayer());
  };

  const onUpdateSelectedPlayer = () => {
    const {id, name} = selectedPlayer;
    const actionType = sessionSlice.actions.updatePlayer.type;
    navigation.navigate('PlayerUpdateScreen', {id, name, type: actionType});
  };

  const onReset = () => {
    const gameId = game?.id as string;
    Alert.alert('Confirm Reset game?', 'You cannot undo this.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => dispatch(sessionSlice.actions.start(gameId)),
      },
    ]);
    dispatch(sessionSlice.actions.start(gameId));
  };

  const onSummary = async () => {
    await analytics().logEvent('game_summary');
    navigation.navigate('SummaryScreen', {
      startDate,
      gameName: game?.name,
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
          <Headline>{game?.name}</Headline>
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
        <ScoringCategories
          contentContainerStyle={scoringCategoriesStyle.contentContainer}>
          {scoringCategories?.map(({name, value, id, config, isBlock}) => (
            <TouchableOpacity
              disabled={isBlock}
              testID={`ScoringCategoryButton.${id}`}
              key={id}
              onPress={() => onSelectScoringCategory(id, config)}>
              <ScoringCategory
                name={name}
                value={value}
                disabled={isBlock}
                numberOfColumns={columnsCount}
              />
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

const ScoringCategories = styled.ScrollView``;

const Game = styled.View`
  padding-left: 28px;
  padding-right: 28px;
`;

const scoringCategoriesStyle = StyleSheet.create({
  contentContainer: {
    marginTop: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
