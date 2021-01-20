import {RootState as State} from './store';

export {AppSelectors, default as appSlice} from './app-slice';
export {default as gameSlice, GameSelectors} from './game-slice';
export {allMenuItems} from './game.data';
export {default, getStore, persistor} from './store';
export type RootState = State;
