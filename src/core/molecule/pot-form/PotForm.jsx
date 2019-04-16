import React from 'react';
import toastr from 'toastr';
import { Input, Toggle, Button, SectionHeader, RotatedIcon } from '../../atom';
import { IconSelector } from '..';
import moneypotsStore from '../../utils/store';
import * as actions from '../../utils/actions';
import { allIcons } from '../../constants';
import { handleInputChange } from '../../utils/lib';
import { _content } from '../../utils/validation';

export class PotForm extends React.Component {
  state = {
    selectedIcon: allIcons[0],
    potName: '',
    potNameError: false,
    potNameErrors: [],
    potThreshold: null,
    potThresholdError: false,
    potThresholdErrors: [],
    potTopUp: null,
    potTopUpError: false,
    potTopUpErrors: [],
    potMonthly: false,
    potFavourite: false,
    potGoal: false,
    potGoalTarget: null,
    potGoalTargetError: false,
    potGoalTargetErrors: [],
    loading: false,
    type: 'add'
  };

  componentDidMount() {
    const { potId, pots } = this.props;
    if (potId && pots) {
      const {
        icon: selectedIcon,
        potName,
        topUpAmount: potTopUp,
        threshold: potThreshold,
        monthly: potMonthly,
        favourite: potFavourite,
        goal: potGoal,
        goalAmount: potGoalTarget
      } = pots[potId];
      this.setState({
        potName,
        potThreshold,
        potTopUp,
        selectedIcon,
        potMonthly,
        potFavourite,
        potGoal,
        potGoalTarget,
        type: 'edit'
      });
    }

    moneypotsStore.on('potFormSuccess', this.potFormSuccess);
    moneypotsStore.on('potFormError', this.potFormError);
  }

  componentWillUnmount() {
    moneypotsStore.removeListener('potFormSuccess', this.potFormSuccess);
    moneypotsStore.removeListener('potFormError', this.potFormError);
  }

  potFormSuccess = () => {
    const { type } = this.state;
    toastr.success(`Pot ${type}ed`);
    this.setState({
      selectedIcon: allIcons[0],
      potName: '',
      potThreshold: '',
      potTopUp: '',
      loading: false
    });
  };

  potFormError = () => {
    const { type } = this.state;
    toastr.error(`Problem with ${type}ing pot`);
  };

  selectIcon = selectedIcon => {
    this.setState({ selectedIcon });
  };

  onClick = () => {
    const {
      potName,
      potThreshold,
      potTopUp,
      potGoal,
      potGoalTarget,
      potMonthly,
      potFavourite,
      selectedIcon,
      type
    } = this.state;

    this.setState({
      loading: true
    });

    const validPotName = _content.validate(potName);

    if (validPotName && type === 'add') {
      actions.addPot({
        potName,
        potThreshold: potThreshold || 0,
        potTopUp: potTopUp || 0,
        potGoal,
        potGoalTarget: potGoalTarget || 0,
        potMonthly,
        potFavourite,
        selectedIcon
      });
    } else if (validPotName && type === 'edit') {
      const { potId } = this.props;
      actions.editPot({
        potId,
        potName,
        potThreshold: potThreshold || 0,
        potTopUp: potTopUp || 0,
        potGoal,
        potGoalTarget: potGoalTarget || 0,
        potMonthly,
        potFavourite,
        selectedIcon
      });
    } else {
      this.setState({
        potNameError: _content.errors(),
        loading: false
      });
    }
  };

  render() {
    const {
      selectedIcon,
      potName,
      potNameError,
      potNameErrors,
      potThreshold,
      potThresholdError,
      potThresholdErrors,
      potTopUp,
      potTopUpError,
      potTopUpErrors,
      potMonthly,
      potFavourite,
      potGoal,
      potGoalTarget,
      potGoalTargetError,
      potGoalTargetErrors,
      loading,
      type
    } = this.state;
    const {
      title = potName || 'New pot',
      subtitle = 'Add a new moneypot',
      sectionIcon = 'settings'
    } = this.props;
    return (
      <React.Fragment>
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="o-row u-padding u-margin-top u-margin-bottom u-background-silver">
          <RotatedIcon icon={sectionIcon} />

          <div className="c-pot-form">
            <div className="c-pot-form__row u-margin-bottom">
              <IconSelector
                selectedIcon={selectedIcon}
                selectIcon={this.selectIcon}
                cardClassName="c-pot-form__icon-selector"
                id="selectedIcon"
                labelText="Icon"
              />
              <Input
                value={potName}
                id="potName"
                type="text"
                onChange={event => handleInputChange(this, event)}
                labelText="Pot name"
                placeholder="Transporter fund"
                error={potNameError}
                errorText={potNameErrors}
                className="u-margin-bottom--none"
              />
            </div>

            <div className="o-row u-margin-bottom">
              <Input
                value={potThreshold}
                id="potThreshold"
                type="number"
                onChange={event => handleInputChange(this, event)}
                labelText="Warning threshold"
                placeholder="£300.00"
                error={potThresholdError}
                errorText={potThresholdErrors}
                className="u-margin-right--half"
              />

              {potGoal && (
                <Input
                  value={potGoalTarget}
                  id="potGoalTarget"
                  type="number"
                  onChange={event => handleInputChange(this, event)}
                  labelText="Goal target"
                  placeholder="£1000.00"
                  error={potGoalTargetError}
                  errorText={potGoalTargetErrors}
                />
              )}

              {potMonthly && (
                <Input
                  value={potTopUp}
                  id="potTopUp"
                  type="number"
                  onChange={event => handleInputChange(this, event)}
                  labelText="Monthly top up"
                  placeholder="£70.00"
                  error={potTopUpError}
                  errorText={potTopUpErrors}
                />
              )}
            </div>

            <div className="o-row">
              <Toggle
                label="Goal pot"
                id="potGoal"
                onChange={event => handleInputChange(this, event)}
                className="u-margin-bottom--half"
                divided
                selected={potGoal}
              />
              <Toggle
                label="Monthly pot"
                id="potMonthly"
                onChange={event => handleInputChange(this, event)}
                className="u-margin-bottom--half"
                divided
                selected={potMonthly}
              />
              <Toggle
                label="Favourite"
                id="potFavourite"
                onChange={event => handleInputChange(this, event)}
                className="u-margin-bottom"
                selected={potFavourite}
              />
            </div>

            <Button
              text={type === 'add' ? 'Add pot' : 'Update pot'}
              onClick={this.onClick}
              className="c-btn--full c-btn--success"
              modifier={{ loading }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
