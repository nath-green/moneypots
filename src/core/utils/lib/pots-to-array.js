export const potsToArray = potsObj => {
  const pots = [];
  Object.keys(potsObj).forEach(pot => {
    pots.push({
      id: pot,
      ...potsObj[pot]
    });
  });
  return pots;
};
