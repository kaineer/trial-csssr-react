// src/components/provider.js

import { Component, Children } from 'react';
import PropTypes from 'prop-types';

export class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

Provider.childContextTypes = {
  store: PropTypes.object
};
