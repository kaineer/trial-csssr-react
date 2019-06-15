// src/connect.js

import React from 'react';
import { object } from 'prop-types';

/**
 * Connect class to state and dispatch
 *
 * @param {function} mapStateToProps
 * @param {function} mapDispatchToProps
 */

export const connect = (mapStateToProps, mapDispatchToProps) => Component => {
  class WrappedComponent extends React.Component {
    render() {
      const { store } = this.context;

      return (
        <Component
          {...this.props}
          {...mapStateToProps(store.getState(), this.props)}
          {...mapDispatchToProps(store.dispatch, this.props)}
        />
      );
    }

    componentDidMount() {
      const { store } = this.context;
      store.subscribe(() => this.forceUpdate());
    }
  }

  WrappedComponent.contextTypes = {
    store: object
  };

  return WrappedComponent;
};
