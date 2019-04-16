import { calculateBalance, calculateProgress, camelcaseToDash } from '..';

export const potContent = unformattedPots => {
  const allTransactions = [];
  const notifications = [];
  const favouritePots = [];
  const pots = {};
  let totalBalance = 0;
  let totalMonthlyTopUp = 0;
  Object.keys(unformattedPots).forEach(pot => {
    const {
      topUpAmount,
      goal,
      goalAmount,
      monthly,
      threshold,
      icon,
      potName,
      transactions = [],
      favourite
    } = unformattedPots[pot];

    Object.keys(transactions).forEach(transaction => {
      allTransactions.push({ ...transactions[transaction], pot, id: transaction });
    });
    const balance = calculateBalance(transactions);
    const progress = calculateProgress(goalAmount, balance);
    const urlId = camelcaseToDash(pot);
    let warning = false;
    let error = false;
    if (favourite) favouritePots.push(pot);
    if (balance < threshold) {
      warning = true;
      if (balance < 0) {
        error = true;
        notifications.push({ type: 'error', message: `${potName} pot is in minus balance` });
      } else {
        notifications.push({ type: 'warning', message: `${potName} pot is under threshold` });
      }
    }
    const formattedBalance = balance.toFixed(2);
    if (monthly) {
      totalBalance += balance;
      totalMonthlyTopUp += parseFloat(topUpAmount);
    }

    pots[pot] = {
      id: pot,
      urlId,
      potName,
      icon,
      topUpAmount,
      goal,
      goalAmount,
      monthly,
      threshold,
      transactions,
      balance: formattedBalance,
      progress,
      favourite,
      warning,
      error
    };
  });

  allTransactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const recentTransactions = allTransactions.slice(0, 20);

  return {
    pots,
    recentTransactions,
    favouritePots,
    notifications,
    totalBalance,
    totalMonthlyTopUp
  };
};
