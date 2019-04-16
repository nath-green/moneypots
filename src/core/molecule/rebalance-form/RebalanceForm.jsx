import React from 'react';
import toastr from 'toastr';
import { Select, Button, SectionHeader, RotatedIcon, MoneyInput } from '../../atom';
import moneypotsStore from '../../utils/store';
import * as actions from '../../utils/actions';
import { handleInputChange } from '../../utils/lib';
import { _currency } from '../../utils/validation';

export class RebalanceForm extends React.Component {
  state = {
    potToId: this.props.pots[0].id,
    potFromId: this.props.pots[1].id,
    transactionValue: '',
    transactionValueError: false,
    loading: false
  };

  componentDidMount() {
    moneypotsStore.on('rebalanceSuccess', this.rebalanceSuccess);
    moneypotsStore.on('rebalanceError', this.rebalanceError);
  }

  componentWillUnmount() {
    moneypotsStore.removeListener('rebalanceSuccess', this.rebalanceSuccess);
    moneypotsStore.removeListener('rebalanceError', this.rebalanceError);
  }

  rebalanceSuccess = () => {
    this.setState({
      transactionValue: '',
      loading: false
    });
    toastr.success('Rebalance successful');
  };

  rebalanceError = () => {
    toastr.error('Problem with rebalance');
  };

  handleSubmit = () => {
    const { transactionValue: value, potToId, potFromId } = this.state;
    const timestamp = new Date();

    this.setState({
      loading: true
    });

    const validTransactionValue = _currency.validate(value);

    if (validTransactionValue) {
      actions.rebalance({ value, timestamp, potToId, potFromId });
    } else {
      this.setState({
        transactionValueError: !validTransactionValue,
        loading: false
      });
    }
  };

  handlePotFromChange = ({ target: { value } }) => {
    const { pots } = this.props;
    const filteredPots = pots.filter(({ id }) => value !== id);
    const potToId = filteredPots[0].id;
    this.setState({
      potFromId: value,
      potToId
    });
  };

  render() {
    const { pots } = this.props;
    const { loading, transactionValue, transactionValueError, potFromId, potToId } = this.state;

    if (pots.length < 2) return null;

    return (
      <React.Fragment>
        <SectionHeader title="Pot rebalance" subtitle="Move money from one pot to another" />

        <div className="o-row u-padding u-margin-top u-margin-bottom u-background-silver">
          <RotatedIcon icon="swap" />

          <MoneyInput
            id="transactionValue"
            value={transactionValue}
            onChange={event => handleInputChange(this, event)}
            label="Rebalance amount"
            className="u-margin-top--half u-margin-bottom--half"
            error={transactionValueError}
            success
          />

          <Select
            id="potFromId"
            labelText="Pot from"
            onChange={this.handlePotFromChange}
            value={potFromId}
          >
            {pots.map(({ id, potName, balance }) => {
              const formattedBalance = Math.abs(balance).toFixed(2);
              return (
                <option value={id} key={id}>
                  {potName} ({balance < 0 && '-'}&pound;{formattedBalance})
                </option>
              );
            })}
          </Select>

          <Select
            id="potToId"
            labelText="Pot to"
            onChange={event => handleInputChange(this, event)}
            value={potToId}
          >
            {pots
              .filter(({ id }) => id !== potFromId)
              .map(({ id, potName, balance }) => {
                const formattedBalance = Math.abs(balance).toFixed(2);
                return (
                  <option value={id} key={id}>
                    {potName} ({balance < 0 && '-'}&pound;{formattedBalance})
                  </option>
                );
              })}
          </Select>

          <Button
            text="Rebalance"
            onClick={this.handleSubmit}
            className="c-btn--full c-btn--success"
            modifier={{ loading }}
          />
        </div>
      </React.Fragment>
    );
  }
}
