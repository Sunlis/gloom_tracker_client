import { combineReducers } from 'redux';

import { otherPlayers } from './other-players';
import { player } from './player';

export const rootReducer = combineReducers({
  otherPlayers,
  player
});
