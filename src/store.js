// src/store.js

/**
 * Create store scope
 *
 * @param {function} reducer
 * @param {any} initialState
 */
export const createStore = (reducer, initialState) => {
  let currentState = initialState;
  const listeners = [];

  const getState = () => currentState;
  const dispatch = action => {
    currentState = reducer(currentState, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => listeners.push(listener);

  const store = { getState, dispatch, subscribe };

  return store;
};
