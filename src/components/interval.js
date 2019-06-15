// src/components/interval.js

import React from 'react';
import { connect } from '../slomux/connect';

import { func, number } from 'prop-types';
import {ActionCreator} from '../reducer';

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

IntervalComponent.propTypes = {
  currentInterval: number.isRequired,
  changeInterval: func.isRequired
};

export const Interval = connect(
  state => ({
    currentInterval: state
  }),
  dispatch => ({
    changeInterval: value => dispatch(ActionCreator.changeInterval(value))
  }),
)(IntervalComponent);
