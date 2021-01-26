import {RootState as State} from './store';

export {default as gameSlice, GameSelectors} from './game-slice';
export {allMenuItems} from './game.data';
export {default, getStore, persistor} from './store';
export type RootState = State;
