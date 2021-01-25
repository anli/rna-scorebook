import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {RootState} from '@store';
import {getSummaryHeaders, removeSelectedPlayer, updatePlayer} from '@utils';
import R from 'ramda';
import {v4 as uuidv4} from 'uuid';
import {GameId, ScoreCategory as GameScoreCategory} from './types';
import {getGame} from './utils';

type State = {
  startDate?: number;
  selectedPlayerId?: string;
  players: Player[];
  game?: {
    id: string;
    name: string;
    scoreCategories?: GameScoreCategory[];
  };
};

type ScoreCategory = {[key: string]: string};

type Player = {
  id: string;
  name: string;
  totalScore: string;
  scoreCategory: ScoreCategory;
};

const initialState = {
  players: [],
};

const sessionSlice = createSlice({
  name: 'session',
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
          scoreCategory: {},
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
        value: string;
        scoreCategoryId: string;
      }>,
    ) => {
      const playerId = state.selectedPlayerId;
      const {value, scoreCategoryId} = action.payload;
      const index = R.findIndex(R.propEq('id', playerId), state.players);
      const newScoreCategory = {
        ...state.players[index].scoreCategory,
        [scoreCategoryId]: value,
      };
      state.players[index].scoreCategory = newScoreCategory;
      state.players[index].totalScore = String(getTotalScore(newScoreCategory));
    },
    start: (state: State, action: PayloadAction<GameId>) => {
      const gameId = action.payload;
      state.selectedPlayerId = 'ME';
      state.players = [
        {
          id: 'ME',
          name: 'ME',
          totalScore: '0',
          scoreCategory: {},
        },
      ];
      state.startDate = +new Date();
      state.game = getGame(gameId);
    },
    removeSelectedPlayer,
    updatePlayer,
  },
});

const selectSelf = (state: RootState) => state.session;

const selectSelectedPlayerId = createDraftSafeSelector(
  selectSelf,
  (state: State) => state.selectedPlayerId,
);

const selectPlayers = createDraftSafeSelector(
  selectSelf,
  (state: State) => state.players,
);

const selectPlayer = createDraftSafeSelector(
  selectPlayers,
  selectSelectedPlayerId,
  (players, playerId) => {
    return players.find(({id}: {id: string}) => id === playerId);
  },
);

const selectGame = createDraftSafeSelector(
  selectSelf,
  (state: State) => state.game,
);

const selectGameScoreCategories = createDraftSafeSelector(
  selectGame,
  (game) => game?.scoreCategories || [],
);

const selectScoringCategories = createDraftSafeSelector(
  selectGameScoreCategories,
  selectPlayer,
  (gameScoreCategories, player) => {
    const playerScoreCategory = player?.scoreCategory;
    const playerTypeId = playerScoreCategory?.['popularity'];
    const result = gameScoreCategories.map(({id, name, configs, blockById}) => {
      const value = playerScoreCategory?.[id] || '0';
      const isBlock = blockById
        ? !getIsAvailable(blockById, playerScoreCategory)
        : false;
      const config =
        configs.length > 1
          ? configs.find(
              ({typeId}: {typeId: string}) => typeId === playerTypeId,
            )
          : R.head(configs);
      return {id, name, value, config, isBlock};
    });
    return result;
  },
);

const selectStartDate = createDraftSafeSelector(
  selectSelf,
  (state: State) => state.startDate,
);

const selectRankings = createDraftSafeSelector(
  selectGameScoreCategories,
  selectPlayers,
  (gameScoreCategories, players) => {
    const rankings = [...players]
      .sort((a, b) => Number(a.totalScore) - Number(b.totalScore))
      .reverse()
      .map((player, index) => {
        const playerScoreCategory = player?.scoreCategory;
        const categories = gameScoreCategories.map(
          ({id, abbreviation: name, isNumeric}) => {
            const value = playerScoreCategory?.[id] || '0';
            return {name, value, isNumeric};
          },
        );

        return {
          ...player,
          rank: index + 1,
          categories,
        };
      });

    return rankings;
  },
);

const selectSummaryHeaders = createDraftSafeSelector(
  selectGame,
  selectRankings,
  (game, rankings) => getSummaryHeaders(R.head(rankings)?.categories || []),
);

export default sessionSlice;

export class SessionSelectors {
  static selectedPlayerId = selectSelectedPlayerId;
  static players = selectPlayers;
  static scoringCategories = selectScoringCategories;
  static startDate = selectStartDate;
  static rankings = selectRankings;
  static summaryHeaders = selectSummaryHeaders;
  static game = selectGame;
}

const getTotalScore = (scoreCategory: ScoreCategory) => {
  return Object.values(scoreCategory).reduce((acc, value) => {
    if (isNaN(Number(value))) {
      return acc;
    }

    return acc + Number(value);
  }, 0);
};

const getIsAvailable = (
  blockById: string,
  playerScoreCategory?: ScoreCategory,
) => {
  return playerScoreCategory && Boolean(playerScoreCategory[blockById]);
};
