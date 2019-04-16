import React from 'react';
import classNames from 'classnames';
import AutosizeInput from 'react-input-autosize';

export const MoneyInput = ({
  value,
  id,
  onChange,
  placeholder = '10.00',
  success,
  error,
  className,
  autoFocus = false,
  withBackground,
  label = 'Transaction amount'
}) => {
  const inputChange = event => onChange(event);
  return (
    <div
      className={classNames('c-money-input', className, {
        'c-money-input--has-value': value.length > 0,
        'c-money-input--success': success,
        'c-money-input--error': error,
        'c-money-input--with-background': withBackground
      })}
    >
      <span className="c-money-input__label">{label}</span>
      <AutosizeInput
        id={id}
        name={id}
        value={value}
        onChange={inputChange}
        inputClassName="c-money-input__field"
        placeholder={placeholder}
        type="number"
        autoFocus={autoFocus}
        className="c-money-input__field-container"
      />
    </div>
  );
};
