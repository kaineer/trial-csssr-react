// src/components/timer.js

import React, { Component } from 'react';
import { connect } from '../connect';
import { Interval } from './interval';

class TimerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      running: false,
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

  handleTimeout(interval) {
    return () => {
      const { running, currentTime } = this.state;

      if (running) {
        this.setState({
          currentTime: currentTime + interval
        });

        this.startTimeout();
      }
    }
  }

  startTimeout() {
    const { currentInterval } = this.props;

    setTimeout(
      this.handleTimeout(currentInterval),
      currentInterval * 1000
    );
  }

  handleStart() {
    this.setState({running: true});
    this.startTimeout();
  }

  handleStop() {
    this.setState({
      running: false,
      currentTime: 0
    });
  }
};

export const Timer = connect(
  state => ({
    currentInterval: state
  }),
  () => ({})
)(TimerComponent);
