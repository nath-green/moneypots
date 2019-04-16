import React from 'react';
import toastr from 'toastr';
import { Button, SectionHeader, RotatedIcon, MoneyInput, Toggle, Input } from '../../atom';
import { history } from '../../routes';
import { camelise } from '../../utils';
import { handleInputChange } from '../../utils/lib';
import { _currency, _content } from '../../utils/validation';
import moneypotsStore from '../../utils/store';
import * as actions from '../../utils/actions';

export class EditPotTransactionForm extends React.Component {
  state = {
    potId: '',
    transactionId: '',
    potName: '',
    transactionValue: '',
    transactionDesc: '',
    loading: false
  };

  componentDidMount() {
    const { potId, pots, transactionId } = this.props;
    const formattedPotId = camelise(potId);
    const { potName } = pots[formattedPotId];
    const transaction = pots[formattedPotId].transactions[transactionId];

    if (!transaction) {
      history.push(`/dashboard/pots`);
    }

    if (transaction) {
      const { value: transactionValue, desc: transactionDesc } = transaction;
      this.setState({
        potId,
        transactionId,
        potName,
        transactionValue: Math.abs(transactionValue).toString(),
        transactionDesc,
        transactionIncoming: transactionValue > 0
      });
    }

    moneypotsStore.on('transactionDeletedError', this.transactionDeletedError);
    moneypotsStore.on('transactionEditSuccess', this.transactionEditSuccess);
    moneypotsStore.on('transactionEditError', this.transactionEditError);
  }

  componentWillUnmount() {
    moneypotsStore.removeListener('transactionDeletedError', this.transactionDeletedError);
    moneypotsStore.removeListener('transactionEditSuccess', this.transactionEditSuccess);
    moneypotsStore.removeListener('transactionEditError', this.transactionEditError);
  }

  editTransaction = () => {
    const { potId, transactionId, transactionDesc, transactionIncoming } = this.state;
    let { transactionValue } = this.state;

    this.setState({
      loading: true
    });

    const validTransactionValue = _currency.validate(transactionValue);
    const validTransactionDesc = _content.validate(transactionDesc);

    if (validTransactionValue && validTransactionDesc) {
      transactionValue = Math.abs(transactionValue);
      const formattedValue = transactionIncoming ? transactionValue : -transactionValue;
      actions.editTransaction({
        value: formattedValue,
        desc: transactionDesc,
        potId,
        transactionId
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

  deleteTransaction = () => {
    const { potId, transactionId } = this.state;
    toastr.success('Transaction deleted');
    actions.deleteTransaction({ potId: camelise(potId), transactionId });
  };

  transactionDeletedError = () => {
    toastr.success('Transaction not deleted');
  };

  transactionEditSuccess = () => {
    toastr.success('Transaction edited');
  };

  transactionEditError = () => {
    toastr.error('Transaction not edited');
  };

  render() {
    const {
      potName,
      transactionValue,
      transactionValueError,
      transactionDesc,
      transactionDescError,
      transactionDescErrors,
      transactionIncoming,
      loading
    } = this.state;

    return (
      <React.Fragment>
        <SectionHeader title={transactionDesc} subtitle={potName} />
        <div className="o-row u-padding u-margin-top u-margin-bottom u-background-silver">
          <RotatedIcon icon="pricetags" />

          <MoneyInput
            id="transactionValue"
            value={transactionValue}
            onChange={event => handleInputChange(this, event)}
            success={transactionIncoming}
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
            selected={transactionIncoming}
          />

          <Input
            value={transactionDesc}
            id="transactionDesc"
            type="text"
            onChange={event => handleInputChange(this, event)}
            placeholder="e.g. Grocery shopping"
            error={transactionDescError}
            errorText={transactionDescErrors}
          />

          <Button
            text="Edit transaction"
            onClick={this.editTransaction}
            className="c-btn--full c-btn--success u-margin-bottom"
            modifier={{ loading }}
          />

          <Button
            text="Delete transaction"
            onClick={this.deleteTransaction}
            className="c-btn--full c-btn--error c-btn--ghost"
          />
        </div>
      </React.Fragment>
    );
  }
}
