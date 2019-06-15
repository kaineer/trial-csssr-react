// src/reducer.js

const ActionType = {
  CHANGE_INTERVAL: 'CHANGE_INTERVAL',
};

export const ActionCreator = {
  changeInterval: (value) => ({
    type: ActionType.CHANGE_INTERVAL,
    payload: value,
  })
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  if (typeof state !== 'number') {
    state = 0;
  }

  switch (type) {
    case ActionType.CHANGE_INTERVAL:
      state += payload;
      if (state < 1) {
        state = 1;
      }
      return state;
    default:
      return state;
  }
};