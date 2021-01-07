import {RootState as State} from './store';

export {default as playSlice, PlaySelectors} from './play-slice';
export {default, persistor} from './store';
export type RootState = State;
