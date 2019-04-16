import React from 'react';
import toastr from 'toastr';
import { SectionHeader, RotatedIcon, Pound, Button } from '../../atom';
import moneypotsStore from '../../utils/store';
import * as actions from '../../utils/actions';

export class PotTopUpForm extends React.Component {
  state = {
    loading: false,
    error: false
  };

  componentDidMount() {
    moneypotsStore.on('transactionError', this.transactionError);
  }

  componentWillUnmount() {
    moneypotsStore.removeListener('transactionError', this.transactionError);
  }

  transactionError = () => {
    this.setState({
      error: true
    });
  };

  topUpPots = () => {
    this.setState({ loading: true });
    const { pots } = this.props;
    pots.forEach(pot => {
      const { id, monthly, topUpAmount } = pot;
      if (monthly) {
        actions.transaction({
          value: parseFloat(topUpAmount),
          desc: 'Monthly top-up',
          timestamp: new Date(),
          potId: id
        });
      }
    });
    this.checkStatus();
  };

  checkStatus = () => {
    const { error } = this.state;
    if (error) {
      toastr.error('There has been a problem');
    } else {
      toastr.success('Monthly top-ups added');
    }
  };

  render() {
    const { totalMonthlyTopUp } = this.props;
    const { loading } = this.state;
    return (
      <React.Fragment>
        <SectionHeader title="Pot top-up" subtitle="Top-up monthly pots monthly" />
        <div className="o-row u-padding u-margin-top u-margin-bottom u-background-silver">
          <RotatedIcon icon="calendar" />
          <p className="c-text-body u-margin-top u-text-ash">
            Monthly top-up amount:
            <Pound
              className="u-text-bold u-text-primary u-margin-left--quarter"
              value={totalMonthlyTopUp}
            />
            <Button
              text="Top-up Monthly Pots"
              onClick={this.topUpPots}
              className="c-btn--full c-btn--success u-margin-top u-margin-bottom"
              modifier={{ loading }}
            />
          </p>
        </div>
      </React.Fragment>
    );
  }
}
