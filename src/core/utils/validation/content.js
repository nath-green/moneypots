import { Validator } from 'basic-validator';
import { charsBetween } from 'basic-validate';

export const _content = new Validator();

_content.rule({
  fn: charsBetween,
  params: [1, 100],
  message: 'Please enter some content'
});
