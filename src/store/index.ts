import {RootState as State} from './store';

export {default as gameSlice, GameSelectors} from './game-slice';
export {default as playSlice, PlaySelectors} from './play-slice';
export {allMenuItems} from './play.data';
export {default, persistor} from './store';
export type RootState = State;
