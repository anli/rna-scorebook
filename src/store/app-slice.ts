import {createDraftSafeSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';

type State = {
  hasOnboard: boolean;
};

const initialState = {
  hasOnboard: false,
};

/* istanbul ignore next */
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    onboard: (state: State) => {
      state.hasOnboard = true;
    },
  },
});

/* istanbul ignore next */
const selectSelf = (state: RootState) => state.app;

/* istanbul ignore next */
const selectHasOnboard = createDraftSafeSelector(
  selectSelf,
  (state: State) => state.hasOnboard,
);

export default appSlice;

export class AppSelectors {
  static hasOnboard = selectHasOnboard;
}
