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
import { Provider } from './components/provider';
import { reducer } from './reducer';

// components
import { Timer } from './components/timer';

// init
ReactDOM.render(
  <Provider store={createStore(reducer)}>
    <Timer />
  </Provider>,
  document.getElementById("app")
);
