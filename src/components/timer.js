// src/components/timer.js

import React, { Component } from 'react';
import { Interval } from './interval';

import { number } from 'prop-types';
import { connect } from '../slomux/connect';

class TimerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  render() {
    return (
      <div>
        <Interval />
        <div>Секундомер: {this.state.currentTime} сек.</div>
        <div>
          <button onClick={this.handleStart}>Старт</button>
          <button onClick={this.handleStop}>Стоп</button>
        </div>
      </div>
    );
  }

  handleStart() {
    setTimeout(
      () =>
        this.setState({
          currentTime: this.state.currentTime + this.props.currentInterval
        }),
      this.props.currentInterval
    );
  }

  handleStop() {
    this.setState({ currentTime: 0 });
  }
}

TimerComponent.propTypes = {
  currentInterval: number.isRequired
};

export const Timer = connect(
  state => ({
    currentInterval: state
  }),
  () => {}
)(TimerComponent);
