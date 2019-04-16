import React from 'react';
import { SectionHeader, RotatedIcon, Button } from '../../atom';
import * as actions from '../../utils/actions';

export const LogoutForm = () => (
  <React.Fragment>
    <SectionHeader title="Logout" subtitle="Sign out of this account" />
    <div className="o-row u-padding u-margin-top u-margin-bottom u-background-silver">
      <RotatedIcon icon="log-out" />

      <Button
        text="Logout"
        onClick={() => actions.logout()}
        className="c-btn--full c-btn--error u-margin-top"
      />
    </div>
  </React.Fragment>
);
