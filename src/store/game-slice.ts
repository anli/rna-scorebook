import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {removeSelectedPlayer, updatePlayer} from '@utils';
import R from 'ramda';
import {v4 as uuidv4} from 'uuid';
import {allMenuItems} from './game.data';
import {RootState} from './store';

type MenuItemScore = {[key: string]: number};
type RoundId = 'round1' | 'round2' | 'round3';
type State = {
  startDate?: number;
  type?: {name: string};
  selectedPlayerId?: string;
  players: Player[];
  menuItemIds?: string[];
};
type Player = {
  id: string;
  name: string;
  totalScore: string;
  roundsMap: RoundsMap;
};
type RoundsMap = {[key in RoundId]: MenuItemScore};

const initialState = {
  players: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addPlayer: (state: State, action: PayloadAction<string>) => {
      const id = uuidv4();
      state.players = [
        ...state.players,
        {
          id,
          name: action.payload,
          totalScore: '0',
          roundsMap: {
            round1: {},
            round2: {},
            round3: {},
          },
        },
      ];
      state.selectedPlayerId = id;
    },
    selectPlayer: (state: State, action: PayloadAction<string>) => {
      state.selectedPlayerId = action.payload;
    },
    setScore: (
      state: State,
      action: PayloadAction<{
        roundId: RoundId;
        menuItemId: string;
        value: number;
      }>,
    ) => {
      const playerId = state.selectedPlayerId;
      const {roundId, menuItemId, value} = action.payload;
      const player = R.find(R.propEq('id', playerId), state.players) as Player;
      const newRoundsMap = {
        ...player.roundsMap,
        [roundId]: {
          ...player?.roundsMap?.[roundId],
          [menuItemId]: String(value),
        },
      };
      const index = R.findIndex(R.propEq('id', playerId), state.players);
      state.players[index].roundsMap = newRoundsMap;
      state.players[index].totalScore = String(getTotalScore(newRoundsMap));
    },
    startGame: (state: State, action: PayloadAction<string[]>) => {
      state.menuItemIds = [
        'eggNigiri',
        'salmonNigiri',
        'squidNigiri',
        ...action.payload,
      ];
      state.type = {name: 'Sushi Go Party!'};
      state.selectedPlayerId = 'ME';
      state.players = [
        {
          id: 'ME',
          name: 'ME',
          totalScore: '0',
          roundsMap: {
            round1: {},
            round2: {},
            round3: {},
          },
        },
      ];
      state.startDate = +new Date();
    },
    removeSelectedPlayer,
    updatePlayer,
  },
});

const selectSelf = (state: RootState) => state.game;

const selectType = createDraftSafeSelector(
  selectSelf,
  (state: State) => state.type,
);

const selectSelectedPlayerId = createDraftSafeSelector(
  selectSelf,
  (state: State) => state.selectedPlayerId,
);

const selectPlayers = createDraftSafeSelector(
  selectSelf,
  (state: State) => state.players,
);

const selectMenuItems = createDraftSafeSelector(selectSelf, (state: State) => {
  return allMenuItems.filter(({id}) => state.menuItemIds?.includes(id));
});

const selectSelectedPlayer = createDraftSafeSelector(
  selectPlayers,
  selectSelectedPlayerId,
  (players, selectedPlayerId) => {
    return R.find(R.propEq('id', selectedPlayerId), players);
  },
);

const selectRoundsMap = createDraftSafeSelector(
  selectSelectedPlayer,
  (selectedPlayer) => selectedPlayer?.roundsMap,
);

export default gameSlice;

export class GameSelectors {
  static type = selectType;

  static selectedPlayerId = selectSelectedPlayerId;

  static players = selectPlayers;

  static menuItems = selectMenuItems;

  static roundScores = createDraftSafeSelector(
    selectRoundsMap,
    selectMenuItems,
    (roundsMap, menuItems) => {
      const getRoundScores = (roundId: RoundId) =>
        menuItems.map((menuItem) => ({
          ...menuItem,
          score: roundsMap?.[roundId]?.[menuItem.id] || '0',
        }));

      return [
        getRoundScores('round1'),
        getRoundScores('round2'),
        getRoundScores('round3'),
      ];
    },
  );

  static playerRankings = createDraftSafeSelector(selectPlayers, (players) => {
    const rankings = [...players]
      .sort((a, b) => Number(a.totalScore) - Number(b.totalScore))
      .reverse()
      .map((player, index) => {
        const round1Score = String(getRoundScore(player.roundsMap.round1));
        const round2Score = String(getRoundScore(player.roundsMap.round2));
        const round3Score = String(getRoundScore(player.roundsMap.round3));
        return {
          ...player,
          rank: index + 1,
          round1Score,
          round2Score,
          round3Score,
        };
      });

    return rankings;
  });
  static startDate = createDraftSafeSelector(
    selectSelf,
    (state: State) => state?.startDate,
  );
}

const getTotalScore = (roundsMap: RoundsMap) => {
  const menuItemScores = R.values(roundsMap);
  const totalScore = menuItemScores.reduce((acc, menuItemScore) => {
    const roundScore = getRoundScore(menuItemScore);
    return acc + roundScore;
  }, 0);
  return totalScore;
};

const getRoundScore = (menuItemScore: MenuItemScore) => {
  return R.sum(R.values(menuItemScore));
};
