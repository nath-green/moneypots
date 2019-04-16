import React from 'react';
import classNames from 'classnames';

export const Toggle = ({ id, onChange, label, className, withBackground, divided, selected }) => (
  <div
    className={classNames('c-toggle', className, {
      'c-toggle--with-background': withBackground,
      'c-toggle--divided': divided
    })}
  >
    <label className="c-toggle__label" htmlFor={id}>
      {label}
      <div>
        <input type="checkbox" id={id} name={id} onChange={e => onChange(e)} checked={selected} />
        <div className="c-toggle__slider" />
      </div>
    </label>
  </div>
);
