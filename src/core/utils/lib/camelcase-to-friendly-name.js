import { camelcaseToDash } from './camelcase-to-dash';
import { uppercaseFirst } from './uppercase-first';

export const camelcaseToFriendlyName = id => {
  let friendlyName = camelcaseToDash(id);
  friendlyName = friendlyName.replace(/-/g, ' ');
  friendlyName = uppercaseFirst(friendlyName);
  return friendlyName;
};
