import { addZeroes } from './add-zeroes';

export const formatNumber = n => {
  const parts = n.toString().split('.');
  const formatFractional = parts[1] ? `.${addZeroes(parts[1])}` : '.00';
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + formatFractional;
};
