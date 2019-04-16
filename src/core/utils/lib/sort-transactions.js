export const sortTransactions = transactions =>
  transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
