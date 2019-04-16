import React from 'react';
import classNames from 'classnames';

export const Select = ({ id, className, labelText, children, onChange, value }) => {
  const selectChange = event => onChange(event);
  const label = (
    <label className="c-label" htmlFor={id}>
      {labelText}
    </label>
  );

  return (
    <React.Fragment>
      {labelText && label}
      <div className={classNames('c-select', className)}>
        <select id={id} name={id} onChange={selectChange} value={value}>
          {children}
        </select>
      </div>
    </React.Fragment>
  );
};
