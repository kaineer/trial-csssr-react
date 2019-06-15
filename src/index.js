import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// Slomux — упрощённая, сломанная реализация Flux.
// Перед вами небольшое приложение, написанное на React + Slomux.
// Это нерабочий секундомер с настройкой интервала обновления.

// Исправьте ошибки и потенциально проблемный код, почините приложение и прокомментируйте своё решение.

// При нажатии на "старт" должен запускаться секундомер и через заданный интервал времени увеличивать свое значение на значение интервала
// При нажатии на "стоп" секундомер должен останавливаться и сбрасывать свое значение

import { createStore } from './slomux/store';
import { connect } from './slomux/connect';
import { Provider } from './components/provider';
import { reducer } from './reducer';

// components

class IntervalComponent extends React.Component {
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

const Interval = connect(
  dispatch => ({
    changeInterval: value => dispatch(changeInterval(value))
  }),
  state => ({
    currentInterval: state
  })
)(IntervalComponent);

class TimerComponent extends React.Component {
  state = {
    currentTime: 0
  };

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

const Timer = connect(
  state => ({
    currentInterval: state
  }),
  () => {}
)(TimerComponent);

// init
ReactDOM.render(
  <Provider store={createStore(reducer)}>
    <Timer />
  </Provider>,
  document.getElementById("app")
);
