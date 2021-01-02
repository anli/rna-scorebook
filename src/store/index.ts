import {RootState as State} from './store';

export {
  default as playSlice,
  menuItemsMapSelector,
  playersMapSelector,
} from './play-slice';
export {default} from './store';
export type RootState = State;
