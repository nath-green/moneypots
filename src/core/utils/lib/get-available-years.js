export const getAvailableYears = obj => {
  const arr = [];
  Object.keys(obj).forEach(key => {
    arr.push(parseInt(key));
  });
  return arr;
};
