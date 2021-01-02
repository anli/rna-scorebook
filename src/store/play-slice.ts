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
type State = {
  playersMap: PlayersMap;
  menuItemsMap: MenuItemsMap;
  totalScoresMap?: TotalScoresMap;
};

const playSlice = createSlice({
  name: 'play',
  initialState: {playersMap: {}, menuItemsMap: {}},
  reducers: {
    setPlayersMap: (state: State, action: PayloadAction<PlayersMap>) => {
      state.playersMap = action.payload;
      state.totalScoresMap = R.mapObjIndexed(() => 0, action.payload);
    },
    setMenuItemsMap: (state: State, action: PayloadAction<MenuItemsMap>) => {
      state.menuItemsMap = action.payload;
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
  static menuItemsMap = createDraftSafeSelector(
    selectSelf,
    (state: State) => state.menuItemsMap,
  );
  static totalScoresMap = createDraftSafeSelector(
    selectSelf,
    (state: State) => state.totalScoresMap,
  );
}
