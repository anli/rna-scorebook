import {combineReducers, configureStore} from '@reduxjs/toolkit';
import playSlice from './play-slice';

const rootReducer = combineReducers({
  play: playSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
