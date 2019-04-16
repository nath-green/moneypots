export const addZeroes = n => {
  let number = n;
  if (number.length === 1) {
    number = `${n}0`;
  }
  return number;
};
