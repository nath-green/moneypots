import { Validator } from 'basic-validator';
import { charsBetween } from 'basic-validate';

export const _currency = new Validator();

const currencyRegex = /^\d+(\.\d{1,2})?$/;

function isCurrency(value) {
  return currencyRegex.test(value);
}

_currency
  .rule({
    fn: charsBetween,
    message: 'Please enter a value',
    params: [1, 15]
  })
  .rule({
    fn: isCurrency,
    message: 'Please enter a valid value'
  });
