import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import R from 'ramda';
import {allMenuItems, compulsoryMenuItemsMap} from './play.data';
import {RootState} from './store';

type PlayersMap = {[key: string]: boolean};
type MenuItemsMap = {[key: string]: boolean};
type ScoresMap = {
  [key: string]: {[key: string]: {[key: string]: number}};
};
type State = {
  playersMap: PlayersMap;
  menuItemsMap: MenuItemsMap;
  scoresMap: ScoresMap;
  selectedPlayer?: string;
};

const initialState = {
  playersMap: {},
  menuItemsMap: {},
  scoresMap: {},
};

const playSlice = createSlice({
  name: 'play',
  initialState,
  reducers: {
    setPlayersMap: (state: State, action: PayloadAction<PlayersMap>) => {
      state.playersMap = action.payload;
    },
    setMenuItemsMap: (state: State, action: PayloadAction<MenuItemsMap>) => {
      state.menuItemsMap = {
        ...compulsoryMenuItemsMap,
        ...action.payload,
      };
    },
    setScore: (
      state: State,
      action: PayloadAction<{
        player: string;
        roundId: string;
        menuItemId: string;
        score: number;
      }>,
    ) => {
      const {roundId, menuItemId, score, player} = action.payload;
      const newState = {
        ...state.scoresMap,
        [player]: {
          ...state.scoresMap?.[player],
          [roundId]: {
            ...state.scoresMap?.[player]?.[roundId],
            [menuItemId]: score,
          },
        },
      };
      state.scoresMap = newState;
    },
    reset: (state: State) => {
      state.playersMap = {};
      state.menuItemsMap = {};
      state.scoresMap = {};
    },
    addPlayer: (state: State, action: PayloadAction<string>) => {
      state.playersMap[action.payload] = true;
    },
    selectPlayer: (state: State, action: PayloadAction<string>) => {
      state.selectedPlayer = action.payload;
    },
    deletePlayer: (state: State, action: PayloadAction<string>) => {
      state.playersMap = R.omit([action.payload], state.playersMap);
    },
  },
});

const selectSelf = (state: RootState) => state.play;

export default playSlice;

export class PlaySelectors {
  static playersMap = createDraftSafeSelector(
    selectSelf,
    (state: State) => state.playersMap,
  );
  static totalScoreMap = createDraftSafeSelector(
    (state: RootState) => state.play.scoresMap,
    (scoresMap: ScoresMap) => {
      return Object.entries(scoresMap).reduce(
        (playersTotalScoreMap, [player, playerScoresMap]) => {
          const playerScore = Object.entries(playerScoresMap).reduce(
            (oldTotal, [_, roundMenuItemScoresMap]) => {
              const roundTotalScore = R.sum(
                Object.values(roundMenuItemScoresMap),
              );
              return oldTotal + roundTotalScore;
            },
            0,
          );
          return {...playersTotalScoreMap, [player]: playerScore};
        },
        {},
      );
    },
  );
  static menuItems = createDraftSafeSelector(selectSelf, (state: State) => {
    return allMenuItems.filter(({id}) =>
      Object.keys(state.menuItemsMap).includes(id),
    );
  });
  static scoresMap = createDraftSafeSelector(
    selectSelf,
    (state: State) => state.scoresMap,
  );
  static roundsTotalScoreMap = createDraftSafeSelector(
    (state: RootState) => state.play.scoresMap,
    (scoresMap: ScoresMap) => {
      return Object.entries(scoresMap).reduce(
        (playersTotalScoreMap, [player, playerScoresMap]) => {
          const playerScore = Object.entries(playerScoresMap).reduce(
            (oldRoundScore, [roundId, roundMenuItemScoresMap]) => {
              return {
                ...oldRoundScore,
                [roundId]: R.sum(Object.values(roundMenuItemScoresMap)),
              };
            },
            {},
          ) as any;
          return {...playersTotalScoreMap, [player]: playerScore};
        },
        {},
      );
    },
  );
  static selectedPlayer = createDraftSafeSelector(
    selectSelf,
    (state: State) => state.selectedPlayer || '',
  );
}
