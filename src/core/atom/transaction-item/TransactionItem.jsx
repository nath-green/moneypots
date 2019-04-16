import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Moment from 'react-moment';
import { Pound } from '../pound';

export const TransactionItem = ({ title, value, to, showPot, pot, timestamp }) => {
  const minus = value < 0;
  const arrow = minus ? 'arrow-down' : 'arrow-up';
  return (
    <Link
      to={to}
      className={classNames('transaction-item', {
        'transaction-item--out': minus,
        'transaction-item--in': !minus
      })}
    >
      <div className="u-flex-space">
        <div className="transaction-item__text">
          <ion-icon name={arrow} class="transaction-item__icon" />
          <div>
            <p className="c-text-small u-text-ash u-margin-top--quarter u-margin-bottom--none">
              {title}
            </p>
            {showPot && <p className="c-text-sub u-text-ash u-margin-top--quarter">{pot}</p>}
            <p className="c-text-sub u-flex u-text-ash u-margin-top--quarter">
              <ion-icon name="time" />
              <Moment fromNow className="u-margin-left--quarter">
                {timestamp}
              </Moment>
            </p>
          </div>
        </div>

        <p className="transaction-item__value c-heading-delta u-margin-bottom--none">
          <Pound value={Math.abs(value)} />
        </p>
      </div>
    </Link>
  );
};
