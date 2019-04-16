import React from 'react';
import classNames from 'classnames';

export const IconCard = ({ icon, className, selected, selectable, onClick }) => (
  <button
    type="button"
    className={classNames('c-icon-card', className, {
      'c-icon-card--selected': selected,
      'c-icon-card--selectable': selectable
    })}
    onClick={onClick}
  >
    <ion-icon name={icon} />
  </button>
);
