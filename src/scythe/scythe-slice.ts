import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {RootState} from '@store';
import R from 'ramda';
import {v4 as uuidv4} from 'uuid';
import ScytheData from './scythe.data';

type State = {
  startDate?: number;
  selectedPlayerId?: string;
  players: Player[];
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

const scytheSlice = createSlice({
  name: 'scythe',
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
    start: (state: State) => {
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
    },
    removeSelectedPlayer: (state: State) => {
      const playerId = state.selectedPlayerId;
      state.players = R.reject(R.propEq('id', playerId), state.players);
      state.selectedPlayerId = 'ME';
    },
    updatePlayer: (
      state: State,
      action: PayloadAction<{id: string; name: string}>,
    ) => {
      const playerIndex = R.findIndex(
        R.propEq('id', action.payload.id),
        state.players,
      );
      state.players[playerIndex].name = action.payload.name;
    },
  },
});

const selectSelf = (state: RootState) => state.scythe;

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

const selectScoringCategories = createDraftSafeSelector(
  selectPlayer,
  (player) => {
    const playerScoreCategory = player?.scoreCategory;
    const playerTypeId = playerScoreCategory?.['popularity'];
    return ScytheData.scoringCategories.map(({id, name, configs}) => {
      const value = playerScoreCategory?.[id] || '0';
      const config =
        configs.length > 1
          ? configs.find(
              ({typeId}: {typeId: string}) => typeId === playerTypeId,
            )
          : R.head(configs);
      return {id, name, value, config};
    });
  },
);

export default scytheSlice;

export class ScytheSelectors {
  static selectedPlayerId = selectSelectedPlayerId;
  static players = selectPlayers;
  static scoringCategories = selectScoringCategories;
}

const getTotalScore = (scoreCategory: ScoreCategory) => {
  return Object.values(scoreCategory).reduce((acc, value) => {
    if (isNaN(Number(value))) {
      return acc;
    }

    return acc + Number(value);
  }, 0);
};
