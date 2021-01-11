import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {RootState} from './store';

const initialState = {};

type State = {
  defaultName?: string;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDefaultName: (state: State, action: PayloadAction<string>) => {
      state.defaultName = action.payload;
    },
  },
});

const selectSelf = (state: RootState) => state.user;

export default userSlice;

export class UserSelectors {
  static defaultName = createDraftSafeSelector(
    selectSelf,
    (state: State) => state.defaultName,
  );
}
