export const transactionsToArray = transactionsObj => {
  const transactions = [];
  Object.keys(transactionsObj).forEach(transaction => {
    transactions.push({
      transactionId: transaction,
      ...transactionsObj[transaction]
    });
  });
  return transactions;
};
