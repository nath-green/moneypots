import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import firebase from '../utils/firebase';

export default class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: true,
      loggedIn: undefined
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        pending: false,
        loggedIn: !!user
      });
    });
  }

  render() {
    const { component: Component, redirectUrl, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={renderProps => {
          const { pending, loggedIn } = this.state;
          if (pending) return null;
          return loggedIn ? (
            <Component {...renderProps} />
          ) : (
            <Redirect
              to={{
                pathname: `${redirectUrl}`,
                state: { from: renderProps.location }
              }}
            />
          );
        }}
      />
    );
  }
}
