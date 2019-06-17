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

const createStore = (reducer, initialState) => {
  let currentState = initialState;
  const listeners = [];

  const getState = () => currentState;
  const dispatch = action => {
    currentState = reducer(currentState, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => listeners.push(listener);

  return { getState, dispatch, subscribe };
};

const connect = (mapStateToProps, mapDispatchToProps) => Component => {
  class WrappedComponent extends React.Component {
    render() {
      return (
        <Component
          {...this.props}
          {...mapStateToProps(this.context.store.getState(), this.props)}
          {...mapDispatchToProps(this.context.store.dispatch, this.props)}
        />
      );
    }

    componentDidMount() {
      this.context.store.subscribe(() => this.forceUpdate());
    }
  }

  WrappedComponent.contextTypes = {
    store: PropTypes.object
  };

  return WrappedComponent;
};

class Provider extends React.Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

Provider.childContextTypes = {
  store: PropTypes.object
};

// APP

// actions
const CHANGE_INTERVAL = "CHANGE_INTERVAL";

// action creators
const changeInterval = value => ({
  type: CHANGE_INTERVAL,
  payload: value
});

// reducers
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INTERVAL:
      state += action.payload;
      if (state < 1) {
        state = 1;
      }
  }
  return state;
};

// components

const IntervalComponent = (props) => {
  const {currentInterval, changeInterval} = props;

  return (
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
};

const Interval = connect(
  state => ({
    currentInterval: state
  }),
  dispatch => ({
    changeInterval: value => dispatch(changeInterval(value))
  })
)(IntervalComponent);

class TimerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      running: false,
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

  getTimeoutHandler(interval) {
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

    this.timer = setTimeout(
      this.getTimeoutHandler(currentInterval),
      currentInterval * 1000
    );
  }

  handleStart() {
    this.setState({ running: true });
    this.startTimer();
  }

  handleStop() {
    this.setState({ running: false, currentTime: 0 });
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
  <Provider store={createStore(reducer, 1)}>
    <Timer />
  </Provider>,
  document.getElementById("app")
);
