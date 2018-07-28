
export const ACTION_TYPES = {
  ADD_COUNTER: 'ADD_COUNTER',
  UPDATE_COUNTER: 'UPDATE_COUNTER',
  MOVE_COUNTER: 'MOVE_COUNTER',
  DELETE_COUNTER: 'DELETE_COUNTER',
  UPDATE_COUNTERS: 'UPDATE_COUNTERS',
  UPDATE_PLAYER: 'UPDATE_PLAYER',
  SET_NAME: 'SET_NAME',
};

export const addCounter = (counter, fromServer = false) => {
  return {
    type: ACTION_TYPES.ADD_COUNTER,
    counter,
    fromServer,
  };
};

export const updateCounter = (index, counter, fromServer = false) => {
  return {
    type: ACTION_TYPES.UPDATE_COUNTER,
    index,
    counter,
    fromServer,
  };
};

export const moveCounter = (before, after, fromServer = false) => {
  return {
    type: ACTION_TYPES.MOVE_COUNTER,
    before,
    after,
    fromServer,
  };
};

export const deleteCounter = (index, fromServer = false) => {
  return {
    type: ACTION_TYPES.DELETE_COUNTER,
    index,
    fromServer,
  };
};

export const updateCounters = (counters, fromServer = false) => {
  return {
    type: ACTION_TYPES.UPDATE_COUNTERS,
    counters,
    fromServer,
  };
};

export const updatePlayer = (player, fromServer = false) => {
  return {
    type: ACTION_TYPES.UPDATE_PLAYER,
    player,
    fromServer,
  };
};

export const setName = (name, fromServer = false) => {
  return {
    type: ACTION_TYPES.SET_NAME,
    name,
    fromServer,
  };
};

