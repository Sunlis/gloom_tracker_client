import { ACTION_TYPES } from '../actions/player';

export const player = (state = {}, action) => {
  console.log('update', action);
  switch (action.type) {
    case ACTION_TYPES.ADD_COUNTER: {
      return {
        ...state,
        counters: [
          ...state.counters,
          action.counter,
        ],
      };
    }
    case ACTION_TYPES.UPDATE_COUNTER: {
      let counters = [...state.counters];
      counters[action.index] = action.counter;
      return {
        ...state,
        counters,
      };
    }
    case ACTION_TYPES.MOVE_COUNTER: {
      let counters = [...state.counters];
      let counter = counters.splice(action.before, 1);
      counters.splice(action.after, 1, counter);
      return {
        ...state,
        counters,
      };
    }
    case ACTION_TYPES.DELETE_COUNTER: {
      let counters = [...state.counters];
      counters.splice(action.index, 1);
      return {
        ...state,
        counters,
      };
    }
    case ACTION_TYPES.UPDATE_COUNTERS: {
      return {
        ...state,
        counters: action.counters,
      };
    }
    case ACTION_TYPES.UPDATE_PLAYER: {
      return {
        ...action.player,
      };
    }
    case ACTION_TYPES.SET_NAME: {
      return {
        ...state,
        name: action.name,
      };
    }
    default:
      return state;
  }
};
