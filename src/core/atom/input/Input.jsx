import React from 'react';
import classNames from 'classnames';

export const Input = ({
  value,
  id,
  type = 'text',
  className = [],
  onChange,
  onKeyDown,
  labelText,
  placeholder,
  validated,
  error,
  errorText,
  iconName,
  currency
}) => {
  const inputChange = event => onChange(event);

  const label = (
    <label className="c-label" htmlFor={id}>
      {labelText}
    </label>
  );

  const errorMessage = e => {
    if (Array.isArray(errorText)) {
      return e.map(err => (
        <p className="c-input__error">
          <ion-icon name="warning" class="u-margin-right--quarter" />
          {err}
        </p>
      ));
    }
    return (
      <p className="c-input__error">
        <ion-icon name="warning" class="u-margin-right--quarter" />
        {e}
      </p>
    );
  };

  const icon = (
    <div className="c-input__icon">
      <ion-icon name={iconName} />
    </div>
  );

  return (
    <div
      className={classNames('c-input', className, {
        'c-input--error': error,
        'c-input--valid': validated,
        'c-input--icon': iconName,
        'c-input--currency': currency
      })}
    >
      {labelText && label}
      <div className="c-input__field-wrapper">
        {iconName && icon}
        <input
          name={id}
          value={value}
          id={id}
          type={type}
          className="c-input__field"
          onChange={inputChange}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck="false"
          placeholder={placeholder}
        />
      </div>
      {error && errorText && errorMessage(errorText)}
    </div>
  );
};
