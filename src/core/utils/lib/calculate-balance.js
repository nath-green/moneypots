export const calculateBalance = transactions => {
  let balance = 0;
  Object.keys(transactions).forEach(transaction => {
    balance += transactions[transaction].value;
  });
  return balance;
};
