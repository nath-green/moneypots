import { Validator } from 'basic-validator';
import { charsBetween } from 'basic-validate';

export const _password = new Validator();

_password.rule({
  fn: charsBetween,
  params: [1, 30],
  message: 'Please enter a password'
});
