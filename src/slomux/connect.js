// src/slomux/connect.js

import React from 'react';
import { object } from 'prop-types';

export const connect = (mapStateToProps, mapDispatchToProps) => Component => {
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

    componentDidUpdate() {
      this.context.store.subscribe(() => this.forceUpdate());
    }
  }

  WrappedComponent.contextTypes = {
    store: object
  };

  return WrappedComponent;
};
