
export const ACTION_TYPES = {
  ADD_COUNTER: 'ADD_COUNTER',
  UPDATE_COUNTER: 'UPDATE_COUNTER',
  MOVE_COUNTER: 'MOVE_COUNTER',
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
