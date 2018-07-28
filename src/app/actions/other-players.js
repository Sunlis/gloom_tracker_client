export const ACTION_TYPES = {
  UPDATE_PLAYERS: 'UPDATE_PLAYERS',
}

export const updatePlayers = (players) => {
  return {
    type: ACTION_TYPES.UPDATE_PLAYERS,
    players,
  };
}
