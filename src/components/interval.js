// src/components/interval.js

import React, { Component } from 'react';
import { connect } from '../slomux/connect';

class IntervalComponent extends Component {
  render() {
    return (
      <div>
        <span>
          Интервал обновления секундомера: {this.props.currentInterval} сек.
        </span>
        <span>
          <button onClick={() => this.props.changeInterval(-1)}>-</button>
          <button onClick={() => this.props.changeInterval(1)}>+</button>
        </span>
      </div>
    );
  }
}

export const Interval = connect(
  dispatch => ({
    changeInterval: value => dispatch(changeInterval(value))
  }),
  state => ({
    currentInterval: state
  })
)(IntervalComponent);
