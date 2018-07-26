import { ACTION_TYPES } from '../actions/actions';

const player = (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_COUNTER:
      return {
        ...state,
        counters: [
          ...state.counters,
          action.counter,
        ],
      };
    case ACTION_TYPES.UPDATE_COUNTER:
      let counters = [...state.counters];
      counters[action.index] = action.counter;
      return {
        ...state,
        counters,
      };
    case ACTION_TYPES.MOVE_COUNTER:
      let counters = [...state.counters];
      let counter = counters.splice(action.before, 1);
      counters.splice(action.after, 1, counter);
      return {
        ...state,
        counters,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  otherPlayers,
  player,
});
