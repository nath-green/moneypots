import React from 'react';
import classNames from 'classnames';
import { Pound } from '../pound';
import { Progress } from '../progress';

export const PotOverview = ({ title, balance, icon, progress, warning, error }) => (
  <div
    className={classNames('c-pot-overview', {
      'c-pot-overview--warning': warning,
      'c-pot-overview--error': error
    })}
  >
    <div className="u-flex-space">
      <div>
        <p className="c-pot-overview__text c-text-small u-margin-top--quarter u-margin-bottom--none">
          <span className="c-pot-overview__circle u-margin-right--half">
            <ion-icon name={icon} />
          </span>
          {title}
        </p>
      </div>

      <p className="c-heading-delta u-margin-bottom--none">
        <Pound value={balance} />
      </p>
    </div>

    {progress && <Progress value={progress} />}
  </div>
);
