import React from 'react';
import classNames from 'classnames';
import { HeroBalance, Card, Progress, Pound } from '../../../atom';
import { Transactions } from '../../../molecule';
import { history } from '../../../routes';
import { camelise, sortTransactions, transactionsToArray } from '../../../utils';

export const Pot = ({ match, pots }) => {
  let { id } = match.params;
  id = camelise(id);
  if (!pots[id]) {
    history.push('/dashboard/pots');
    return null;
  }
  const { balance, potName, goal, goalAmount, progress, transactions } = pots[id];
  const formattedTransactions = sortTransactions(transactionsToArray(transactions));
  const transactionClasses = classNames('o-row', {
    'u-overlap-above': !goal
  });

  return (
    <React.Fragment>
      <HeroBalance
        type="Pot"
        name={potName}
        balance={balance}
        settingsUrl={`${match.url}/settings`}
      />
      {goal && (
        <div className="o-row u-overlap-above">
          <Card>
            <div className="u-flex-space">
              <p className="u-text-ash">
                <Pound value={0} />
              </p>
              <p className="u-text-ash">
                <Pound value={goalAmount} />
              </p>
            </div>
            <Progress value={progress} className="u-margin-top--half" />
          </Card>
        </div>
      )}
      {formattedTransactions.length > 0 && (
        <div className={transactionClasses}>
          <Card>
            <Transactions baseUrl={match.url} transactions={formattedTransactions} />
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};
