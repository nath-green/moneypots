import React from 'react';
import classNames from 'classnames';
import { formatNumber } from '../../utils';

export const Pound = ({ value, className = [], showMinus = true }) => {
  const formattedNumber = formatNumber(Math.abs(value));
  const parts = formattedNumber.split('.');
  const [integer, fractional] = parts;
  const formattedFractional = `.${fractional.substring(0, 2)}`;
  const isMinus = value < 0;

  return (
    <span className={classNames('c-pound', { 'c-pound--minus': showMinus && isMinus }, className)}>
      <span className="">&pound;</span>
      {integer}
      <span className="c-text-sub">{formattedFractional}</span>
    </span>
  );
};
