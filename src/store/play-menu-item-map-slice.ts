import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

type State = {[key: string]: boolean};

const playMenuItemsMapSlice = createSlice({
  name: 'playMenuItemsMap',
  initialState: {} as State,
  reducers: {
    set: (state: State, action: PayloadAction<{[key: string]: boolean}>) =>
      (state = action.payload),
  },
});

const selectSelf = (state: State) => state.playMenuItemsMap;
export const playMenuItemsMapSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state,
);

export default playMenuItemsMapSlice;
