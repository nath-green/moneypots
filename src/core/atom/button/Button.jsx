import React from 'react';
import classNames from 'classnames';

export const Button = ({
  text,
  className,
  onClick,
  modifier: { loading = false, disabled = false } = {}
}) => {
  const onClickHandler = () => {
    if (!loading && !disabled) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={classNames('c-btn', className, {
        'c-btn--disabled': disabled,
        'c-btn--loading': loading
      })}
      onClick={onClickHandler}
      disabled={disabled || loading}
    >
      {text}
      <ion-icon name="arrow-forward" class="u-margin-left--quarter" />
    </button>
  );
};
