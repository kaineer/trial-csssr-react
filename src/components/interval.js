// src/components/interval.js

import React, { Component } from 'react';
import { connect } from '../slomux/connect';

const IntervalComponent = ({currentInterval, changeInterval}) => (
  <div>
    <span>
      Интервал обновления секундомера: {currentInterval} сек.
    </span>
    <span>
      <button onClick={() => changeInterval(-1)}>-</button>
      <button onClick={() => changeInterval(1)}>+</button>
    </span>
  </div>
);

export const Interval = connect(
  state => ({
    currentInterval: state
  }),
  dispatch => ({
    changeInterval: value => dispatch(changeInterval(value))
  }),
)(IntervalComponent);
