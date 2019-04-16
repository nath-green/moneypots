import React from 'react';
import { RebalanceForm, PotForm, PotTopUpForm, LogoutForm } from '../../../molecule';

export const Settings = ({ pots, totalMonthlyTopUp }) => (
  <React.Fragment>
    <div className="o-container">
      <RebalanceForm pots={pots} />
      <PotForm pots={pots} sectionIcon="add-circle" />
      <PotTopUpForm pots={pots} totalMonthlyTopUp={totalMonthlyTopUp} />
      <LogoutForm />
    </div>
  </React.Fragment>
);
