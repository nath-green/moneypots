import React from 'react';
import { Dashboard } from './containers';

export const DashboardPage = props => {
  const routeProps = props;
  return (
    <React.Fragment>
      <Dashboard {...routeProps} />
    </React.Fragment>
  );
};
