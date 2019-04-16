import { potContent } from './pot-content';
import { potsToArray } from '..';

export const storeContent = unformattedData => {
  const formattedPots = potContent(unformattedData.pots);
  const {
    pots,
    recentTransactions,
    favouritePots,
    notifications,
    totalBalance,
    totalMonthlyTopUp
  } = formattedPots;
  const potsList = potsToArray(pots);

  return {
    totalBalance,
    home: {
      totalBalance,
      accountType: 'Current account',
      accountName: 'Monzo Joint'
    },
    favouritePots,
    pots,
    recentTransactions,
    potsList,
    notifications,
    totalMonthlyTopUp
  };
};
