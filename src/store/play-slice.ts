import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {RootState} from './store';

type PlayersMap = {[key: string]: boolean};
type MenuItemsMap = {[key: string]: boolean};
type State = {
  playersMap: PlayersMap;
  menuItemsMap: MenuItemsMap;
};

const set = <PayloadActionType>(key: keyof State) => (
  state: State,
  action: PayloadAction<any | PayloadActionType>,
) => {
  state[key] = action.payload;
};

const playSlice = createSlice({
  name: 'play',
  initialState: {playersMap: {}, menuItemsMap: {}},
  reducers: {
    setPlayersMap: set<PlayersMap>('playersMap'),
    setMenuItemsMap: set<MenuItemsMap>('menuItemsMap'),
  },
});

const selectSelf = (state: RootState) => state.play;

export const playersMapSelector = createDraftSafeSelector(
  selectSelf,
  (state: State) => state.playersMap,
);

export const menuItemsMapSelector = createDraftSafeSelector(
  selectSelf,
  (state: State) => state.menuItemsMap,
);

export default playSlice;
