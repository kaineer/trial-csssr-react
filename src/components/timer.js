// src/components/timer.js

import React, { Component } from 'react';
import { Interval } from './interval';

import { number } from 'prop-types';
import { connect } from '../slomux/connect';

const msPerSecond = 1000;

class TimerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      running: false
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

  handleTimeout(interval) {
    return () => {
      const { currentTime, running } = this.state;

      if (running) {
        this.setState({ currentTime: currentTime + interval });
        this.startTimer();
      }
    }
  }

  startTimer() {
    const { currentInterval } = this.props;
    setTimeout(
      this.handleTimeout(currentInterval),
      currentInterval * msPerSecond
    );
  }

  handleStart() {
    this.setState({running: true});
    this.startTimer();
  }

  handleStop() {
    this.setState({running: false});
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
