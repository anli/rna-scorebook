import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import R from 'ramda';
import {RootState} from './store';

type PlayersMap = {[key: string]: boolean};
type MenuItemsMap = {[key: string]: boolean};
type TotalScoresMap = {[key: string]: number};
type ScoresMap = {
  [key: string]: {[key: string]: number};
};
type State = {
  playersMap: PlayersMap;
  menuItemsMap: MenuItemsMap;
  scoresMap: ScoresMap;
};

const allMenuItems = [
  {
    id: 'temaki',
    name: 'TEMAKI',
    typeId: 'rolls',
  },
  {
    id: 'uramaki',
    name: 'URAMAKI',
    typeId: 'rolls',
  },
  {
    id: 'maki',
    name: 'MAKI',
    typeId: 'rolls',
  },
  {
    id: 'soySauce',
    name: 'SOY SAUCE',
    typeId: 'specials',
  },
  {
    id: 'wasabi',
    name: 'WASABI',
    typeId: 'specials',
  },
  {
    id: 'spoon',
    name: 'SPOON',
    typeId: 'specials',
  },
  {
    id: 'chopsticks',
    name: 'CHOPSTICKS',
    typeId: 'specials',
  },
  {
    id: 'takeoutBox',
    name: 'TAKEOUT BOX',
    typeId: 'specials',
  },
  {
    id: 'specialOrder',
    name: 'SPECIAL ORDER',
    typeId: 'specials',
  },
  {
    id: 'menu',
    name: 'MENU',
    typeId: 'specials',
  },
  {
    id: 'onigiri',
    name: 'ONIGIRI',
    typeId: 'appetizers',
  },
  {
    id: 'edamame',
    name: 'EDAMAME',
    typeId: 'appetizers',
  },
  {
    id: 'tempura',
    name: 'TEMPURA',
    typeId: 'appetizers',
  },
  {
    id: 'misoSoup',
    name: 'MISO SOUP',
    typeId: 'appetizers',
  },
  {
    id: 'sashimi',
    name: 'SASHIMI',
    typeId: 'appetizers',
  },
  {
    id: 'eel',
    name: 'eel',
    typeId: 'appetizers',
  },
  {
    id: 'dumpling',
    name: 'DUMPLING',
    typeId: 'appetizers',
  },
  {
    id: 'tofu',
    name: 'TOFU',
    typeId: 'appetizers',
  },
  {
    id: 'pudding',
    name: 'PUDDING',
    typeId: 'desserts',
  },
  {
    id: 'fruit',
    name: 'FRUIT',
    typeId: 'desserts',
  },
  {
    id: 'greenTeaIceCream',
    name: 'GREEN TEA ICE CREAM',
    typeId: 'desserts',
  },
];

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
      state.menuItemsMap = action.payload;
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
