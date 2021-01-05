import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import R from 'ramda';
import {allMenuItems, compulsoryMenuItemsMap} from './play-data';
import {RootState} from './store';

type PlayersMap = {[key: string]: boolean};
type MenuItemsMap = {[key: string]: boolean};
type ScoresMap = {
  [key: string]: {[key: string]: number};
};
type State = {
  playersMap: PlayersMap;
  menuItemsMap: MenuItemsMap;
  scoresMap: ScoresMap;
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
    adjustScore: (
      state: State,
      action: PayloadAction<{
        roundId: string;
        menuItemId: string;
        adjustment: number;
      }>,
    ) => {
      const {roundId, menuItemId, adjustment} = action.payload;
      const newValue =
        (state.scoresMap?.[roundId]?.[menuItemId] || 0) + adjustment;
      state.scoresMap = {
        ...state.scoresMap,
        [roundId]: {
          ...(state.scoresMap?.[roundId] || {}),
          [menuItemId]: newValue,
        },
      };
    },
    reset: (state: State) => {
      state.playersMap = {};
      state.menuItemsMap = {};
      state.scoresMap = {};
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
  static totalScore = createDraftSafeSelector(
    (state: RootState) => state.play.scoresMap,
    (scoresMap: ScoresMap) => {
      return Object.entries(scoresMap).reduce(
        (oldTotal, [_, roundMenuItemScoresMap]) => {
          const roundTotalScore = R.sum(Object.values(roundMenuItemScoresMap));
          return oldTotal + roundTotalScore;
        },
        0,
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
        (oldRoundScore, [roundId, roundMenuItemScoresMap]) => {
          return {
            ...oldRoundScore,
            [roundId]: R.sum(Object.values(roundMenuItemScoresMap)),
          };
        },
        {},
      ) as any;
    },
  );
}
