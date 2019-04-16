import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RedirectRoute from './RedirectRoute';
import { Login, Dashboard } from '../pages';
import { history } from './history';

history.listen(() => window.scrollTo(0, 0));

export const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <ProtectedRoute path="/dashboard" redirectUrl="/login" component={Dashboard} />
      <RedirectRoute path="/login" redirectUrl="/dashboard" component={Login} />
      <Route component={() => <Redirect to="/login" />} />
    </Switch>
  </Router>
);
