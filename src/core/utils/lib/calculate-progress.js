export const calculateProgress = (goal, balance) => {
  if (!goal) return false;
  return (100 / goal) * balance;
};
