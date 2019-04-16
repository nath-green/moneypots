import { Validator } from 'basic-validator';
import { isEmail } from 'basic-validate';

export const _email = new Validator();

_email.rule({
  fn: isEmail,
  message: 'Please enter a valid email address'
});
