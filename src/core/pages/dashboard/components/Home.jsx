import React from 'react';
import { HeroBalance, PotOverview, Card, Notification, TransactionItem } from '../../../atom';
import { camelcaseToDash, camelcaseToFriendlyName } from '../../../utils';

export const Home = ({
  match,
  content: {
    home: { totalBalance, accountType, accountName },
    recentTransactions,
    favouritePots,
    notifications,
    pots
  }
}) => (
  <React.Fragment>
    <HeroBalance
      type={accountType}
      name={accountName}
      balance={totalBalance}
      settingsUrl={`${match.url}/settings`}
      ctaText="Pots Settings"
    />

    <div className="o-row u-overlap-above">
      {favouritePots.map(pot => {
        const { urlId, potName, balance, icon, warning, error } = pots[pot];
        return (
          <Card to={`/dashboard/pots/${urlId}`} className="u-margin-bottom--half" key={urlId}>
            <PotOverview
              title={potName}
              balance={balance}
              progress={false}
              icon={icon}
              warning={warning}
              error={error}
            />
          </Card>
        );
      })}
    </div>

    <div className="o-row">
      {notifications.length > 0 && (
        <Card className="u-padding-top--half u-padding-bottom--half u-margin-bottom--half">
          <p className="c-text-small u-text-pavement u-margin-bottom--none">Notifications</p>
          <hr />
          <div className="o-row">
            {notifications.map((notification, index) => (
              <Notification {...notification} key={index} />
            ))}
          </div>
        </Card>
      )}
    </div>

    <div className="o-row">
      <Card>
        <p className="c-text-small u-text-pavement u-margin-bottom--none">Recent transactions</p>
        <hr />
        {recentTransactions.map(transaction => {
          const { desc, value, timestamp, id, pot } = transaction;
          return (
            <TransactionItem
              key={id}
              title={desc}
              value={value}
              to={`${match.url}/pots/${camelcaseToDash(pot)}/transaction/${id}`}
              showPot
              pot={camelcaseToFriendlyName(pot)}
              timestamp={timestamp}
              loadMore
            />
          );
        })}
      </Card>
    </div>
  </React.Fragment>
);
