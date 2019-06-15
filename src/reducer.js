// src/reducer.js

const CHANGE_INTERVAL = "CHANGE_INTERVAL";

export const ActionCreator = {
  changeInterval: (value) => ({
    type: CHANGE_INTERVAL,
    payload: value,
  })
};

// reducers
export const reducer = (state, action) => {
  const {type, payload} = action;

  switch (type) {
    case CHANGE_INTERVAL:
      state += payload;
      if (state < 1) {
        state = 1;
      }
      return state;
    default:
      return state;
  }
};
