import React from 'react';
import toastr from 'toastr';
import {
  Input,
  Select,
  Button,
  SectionHeader,
  RotatedIcon,
  MoneyInput,
  Toggle,
  DateSelector
} from '../../atom';
import { handleInputChange, camelcaseToDash } from '../../utils/lib';
import { _currency, _content } from '../../utils/validation';
import moneypotsStore from '../../utils/store';
import * as actions from '../../utils/actions';
import { history } from '../../routes';

export class PotTransactionForm extends React.Component {
  state = {
    potId: this.props.pots[0].id,
    transactionValue: '',
    transactionValueError: false,
    transactionDesc: '',
    transactionDescError: false,
    transactionDescErrors: [],
    transactionTimestamp: false,
    transactionIncoming: false,
    loading: false
  };

  componentDidMount() {
    moneypotsStore.on('transactionSuccess', this.transactionSuccess);
    moneypotsStore.on('transactionError', this.transactionError);
  }

  componentWillUnmount() {
    moneypotsStore.removeListener('transactionSuccess', this.transactionSuccess);
    moneypotsStore.removeListener('transactionError', this.transactionError);
  }

  transactionSuccess = () => {
    const { potId } = this.state;
    toastr.success('Transaction added');
    history.push(`/dashboard/pots/${camelcaseToDash(potId)}`);
  };

  transactionError = () => {
    toastr.error('Problem with transaction');
  };

  handleDateChange = transactionTimestamp => {
    this.setState({
      transactionTimestamp
    });
  };

  selectToday = () => {
    this.setState({
      transactionTimestamp: false
    });
  };

  handleSubmit = () => {
    const { transactionDesc, transactionTimestamp, potId, transactionIncoming } = this.state;
    let { transactionValue } = this.state;

    this.setState({
      loading: true
    });

    const validTransactionValue = _currency.validate(transactionValue);
    const validTransactionDesc = _content.validate(transactionDesc);

    if (validTransactionValue && validTransactionDesc) {
      transactionValue = Math.abs(transactionValue);
      const formattedValue = transactionIncoming ? transactionValue : -transactionValue;
      const formattedDate = transactionTimestamp || new Date();
      actions.transaction({
        value: formattedValue,
        desc: transactionDesc,
        timestamp: formattedDate,
        potId
      });
    } else {
      this.setState({
        transactionValueError: !validTransactionValue,
        transactionDescError: !validTransactionDesc,
        transactionDescErrors: _content.errors(),
        loading: false
      });
    }
  };

  render() {
    const { pots } = this.props;
    const {
      transactionValue,
      transactionValueError,
      transactionDesc,
      transactionDescError,
      transactionDescErrors,
      transactionTimestamp,
      transactionIncoming,
      loading
    } = this.state;

    if (pots.length === 0) return null;

    return (
      <React.Fragment>
        <SectionHeader title="Pot transaction" subtitle="Add a transaction to a pot of money." />

        <div className="o-row u-padding u-margin-top u-margin-bottom u-background-silver">
          <RotatedIcon icon="cart" />

          <MoneyInput
            id="transactionValue"
            value={transactionValue}
            onChange={event => handleInputChange(this, event)}
            success={transactionIncoming}
            autoFocus
            withBackground
            className="u-margin-top--half"
            error={transactionValueError}
          />

          <Toggle
            id="transactionIncoming"
            onChange={event => handleInputChange(this, event)}
            label="Transaction incoming"
            className="u-margin-bottom"
            withBackground
          />

          <Select id="potId" onChange={event => handleInputChange(this, event)}>
            {pots.map(pot => {
              const { id, potName, balance } = pot;
              const formattedBalance = Math.abs(balance).toFixed(2);
              return (
                <option value={id} key={id}>
                  {potName} ({balance < 0 && '-'}&pound;{formattedBalance})
                </option>
              );
            })}
          </Select>

          <Input
            value={transactionDesc}
            id="transactionDesc"
            type="text"
            onChange={event => handleInputChange(this, event)}
            placeholder="e.g. Grocery shopping"
            error={transactionDescError}
            errorText={transactionDescErrors}
          />

          <DateSelector
            id="transactionTimestamp"
            className="u-margin-bottom"
            transactionTimestamp={transactionTimestamp}
            onChange={this.handleDateChange}
            selectToday={this.selectToday}
          />

          <Button
            text="Add transaction"
            onClick={this.handleSubmit}
            className="c-btn--full c-btn--success"
            modifier={{ loading }}
          />
        </div>
      </React.Fragment>
    );
  }
}
