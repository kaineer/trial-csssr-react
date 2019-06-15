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
  switch (action.type) {
    case CHANGE_INTERVAL:
      return (state += action.payload);
    default:
      return {};
  }
};
