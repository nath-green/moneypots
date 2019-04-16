import React from 'react';
import { TransactionItem, Button } from '../../atom';
import { TRANSACTIONS_ROW_COUNT, TRANSACTIONS_ROW_INCREMENT } from '../../constants';

export class Transactions extends React.Component {
  state = {
    rowCount: TRANSACTIONS_ROW_COUNT,
    loadMore: this.props.transactions.length > TRANSACTIONS_ROW_COUNT
  };

  loadTransactions = () => {
    const { transactions } = this.props;
    this.setState(prevState => ({
      rowCount: prevState.rowCount + TRANSACTIONS_ROW_INCREMENT,
      loadMore: prevState.rowCount + TRANSACTIONS_ROW_INCREMENT < transactions.length
    }));
  };

  render() {
    const { rowCount, loadMore } = this.state;
    const { transactions, baseUrl, pagination = true } = this.props;
    return (
      <React.Fragment>
        {transactions.slice(0, rowCount).map(transaction => {
          const { transactionId, desc, value, timestamp } = transaction;

          return (
            <TransactionItem
              key={transactionId}
              title={desc}
              value={value}
              to={`${baseUrl}/transaction/${transactionId}`}
              timestamp={timestamp}
            />
          );
        })}

        {pagination && (
          <Button
            text="Load more"
            onClick={this.loadTransactions}
            className="c-btn--full c-btn--primary u-margin-top"
            modifier={{ disabled: !loadMore }}
          />
        )}
      </React.Fragment>
    );
  }
}
