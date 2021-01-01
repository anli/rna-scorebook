import {combineReducers, configureStore} from '@reduxjs/toolkit';
import playMenuItemsMapSlice from './play-menu-item-map-slice';

const rootReducer = combineReducers({
  playMenuItemsMap: playMenuItemsMapSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
