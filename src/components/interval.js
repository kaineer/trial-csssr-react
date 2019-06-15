// src/components/interval.js

import React from 'react';
import { number, func } from 'prop-types';
import { connect } from '../connect';
import { ActionCreator } from '../reducer';

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

const mapStateToProps = state => ({
  currentInterval: state
});

const mapDispatchToProps = dispatch => ({
  changeInterval: (value) => dispatch(ActionCreator.changeInterval(value))
});

export const Interval = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntervalComponent);