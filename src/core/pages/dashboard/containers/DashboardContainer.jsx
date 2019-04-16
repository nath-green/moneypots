import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { NavStrip } from '../../../molecule';
import { Query } from '../../../organism';
import { Spinner } from '../../../atom';
import { Home, Pots, Pot, PotSettings, PotTransaction, Transaction, Settings } from '../components';

export const DashboardContainer = ({ match }) => (
  <Query url="/">
    {({ data, loading, error }) => {
      if (loading) {
        return <Spinner overlay />;
      }

      if (error) {
        return 'error';
      }

      const {
        home,
        favouritePots,
        recentTransactions,
        pots,
        potsList,
        notifications,
        totalMonthlyTopUp
      } = data;

      return (
        <div className="p-dashboard">
          <div className="p-dashboard__content" id="body-content">
            <div className="o-container">
              <Switch>
                <Route
                  exact
                  path={match.url}
                  render={routeProps => (
                    <Home
                      {...routeProps}
                      content={{ home, recentTransactions, favouritePots, pots, notifications }}
                    />
                  )}
                />
                <Route
                  path={`${match.url}/pots/:potId/transaction/:id`}
                  render={routeProps => <PotTransaction {...routeProps} pots={pots} />}
                />
                <Route
                  path={`${match.url}/pots/:id/settings`}
                  render={routeProps => <PotSettings {...routeProps} pots={pots} />}
                />
                <Route
                  path={`${match.url}/pots/:id`}
                  render={routeProps => <Pot {...routeProps} pots={pots} />}
                />
                <Route
                  path={`${match.url}/pots`}
                  render={routeProps => <Pots {...routeProps} pots={potsList} />}
                />
                <Route
                  path={`${match.url}/transaction`}
                  render={routeProps => <Transaction {...routeProps} pots={potsList} />}
                />
                <Route
                  path={`${match.url}/settings`}
                  render={routeProps => (
                    <Settings
                      {...routeProps}
                      pots={potsList}
                      totalMonthlyTopUp={totalMonthlyTopUp}
                    />
                  )}
                />
                <Route component={() => <Redirect to="/" />} />
              </Switch>
            </div>
          </div>
          <NavStrip {...match} />
        </div>
      );
    }}
  </Query>
);
