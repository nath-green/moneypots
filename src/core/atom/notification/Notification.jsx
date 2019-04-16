import React from 'react';
import classNames from 'classnames';

export const Notification = ({ type, message }) => {
  const icon = {
    error: 'alert',
    warning: 'alert',
    success: 'checkmark-circle'
  };

  return (
    <div className={classNames('c-notif', `c-notif--${type}`)}>
      <p className="c-notif__text c-text-small u-text-ash u-margin-bottom--none">
        <span className="c-notif__icon u-margin-right--half">
          <ion-icon name={icon[type]} />
        </span>
        {message}
      </p>
    </div>
  );
};
