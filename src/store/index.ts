import {RootState as State} from './store';

export {default as playSlice, PlaySelectors} from './play-slice';
export {default, persistor} from './store';
export {default as userSlice, UserSelectors} from './user-slice';
export type RootState = State;
