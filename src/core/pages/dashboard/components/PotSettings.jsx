import React from 'react';
import { Button } from '../../../atom';
import { PotForm } from '../../../molecule';
import * as actions from '../../../utils/actions';
import { camelise } from '../../../utils';

export const PotSettings = ({
  match: {
    params: { id }
  },
  pots
}) => {
  const potId = camelise(id);

  return (
    <React.Fragment>
      <PotForm pots={pots} potId={potId} subtitle="Edit this pot" />

      <div className="o-container">
        <Button
          text="Clear pot"
          onClick={() => actions.clearPot({ potId })}
          className="c-btn--primary c-btn--full c-btn--ghost u-margin-bottom--half"
        />
        <Button
          text="Remove Pot"
          onClick={() => actions.removePot({ potId })}
          className="c-btn--ghost c-btn--error c-btn--full"
        />
      </div>
    </React.Fragment>
  );
};
