
export const ACTION_TYPES = {
  ADD_COUNTER: 'ADD_COUNTER',
  UPDATE_COUNTER: 'UPDATE_COUNTER',
  MOVE_COUNTER: 'MOVE_COUNTER',
  DELETE_COUNTER: 'DELETE_COUNTER',
  UPDATE_COUNTERS: 'UPDATE_COUNTERS',
  UPDATE_PLAYER: 'UPDATE_PLAYER',
  SET_NAME: 'SET_NAME',
};

export const addCounter = (counter) => {
  return {
    type: ACTION_TYPES.ADD_COUNTER,
    counter,
  };
};

export const updateCounter = (index, counter) => {
  return {
    type: ACTION_TYPES.UPDATE_COUNTER,
    index,
    counter,
  };
};

export const moveCounter = (before, after) => {
  return {
    type: ACTION_TYPES.MOVE_COUNTER,
    before,
    after,
  };
};

export const deleteCounter = (index) => {
  return {
    type: ACTION_TYPES.DELETE_COUNTER,
    index,
  };
};

export const updateCounters = (counters) => {
  return {
    type: ACTION_TYPES.UPDATE_COUNTERS,
    counters,
  };
};

export const updatePlayer = (player) => {
  return {
    type: ACTION_TYPES.UPDATE_PLAYER,
    player,
  };
};

export const setName = (name) => {
  return {
    type: ACTION_TYPES.SET_NAME,
    name,
  };
};

