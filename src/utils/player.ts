import {PayloadAction} from '@reduxjs/toolkit';
import R from 'ramda';

export const removeSelectedPlayer = (state: any) => {
  const playerId = state.selectedPlayerId;
  state.players = R.reject(R.propEq('id', playerId), state.players);
  state.selectedPlayerId = 'ME';
};

export const updatePlayer = (
  state: any,
  action: PayloadAction<{id: string; name: string}>,
) => {
  const playerIndex = R.findIndex(
    R.propEq('id', action.payload.id),
    state.players,
  );
  state.players[playerIndex].name = action.payload.name;
};
