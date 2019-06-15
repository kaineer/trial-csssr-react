// src/components/provider.js

import { Component, Children } from 'react';
import { object } from 'prop-types';

export class Provider extends Component {
  getChildContext() {
    const { store } = this.props;
    return { store };
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}

Provider.childContextTypes = {
  store: object.isRequired
};
