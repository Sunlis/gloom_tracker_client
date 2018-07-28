import { ACTION_TYPES } from '../actions/other-players';

export const otherPlayers = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_PLAYERS:
      return [
        ...action.players,
      ];
    default:
      return state;
  }
};
