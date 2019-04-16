import { capitalise } from './capitalise';

export const camelise = str => {
  const string = str
    .toLowerCase()
    .replace(/[^A-Za-z0-9]/g, ' ')
    .split(' ')
    .reduce((result, word) => result + capitalise(word.toLowerCase()));
  return string.charAt(0).toLowerCase() + string.slice(1);
};
