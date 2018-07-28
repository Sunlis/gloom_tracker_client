import { combineReducers } from 'redux';

import { otherPlayers } from './other-players';
import { player } from './player';

export const isDataFromServer = (state = {}, action) => {
  return !!action.fromServer;
}

export const rootReducer = combineReducers({
  otherPlayers,
  player,
  isDataFromServer,
});
