import React from 'react';
import { Card, PotOverview } from '../../../atom';

export const Pots = ({ match, pots }) => (
  <div className="pots u-margin-top">
    <div className="o-row">
      {pots.map(pot => {
        const { urlId, potName, balance, icon, warning, error } = pot;
        return (
          <div className="sm-12" key={urlId}>
            <Card to={`${match.url}/${urlId}`} className="u-margin-bottom--half" key={urlId}>
              <PotOverview
                title={potName}
                balance={balance}
                progress={false}
                icon={icon}
                warning={warning}
                error={error}
              />
            </Card>
          </div>
        );
      })}
    </div>
  </div>
);
