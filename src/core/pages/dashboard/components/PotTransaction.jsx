import React from 'react';
import { EditPotTransactionForm } from '../../../molecule';

export const PotTransaction = ({
  pots,
  match: {
    params: { potId, id: transactionId }
  }
}) => <EditPotTransactionForm pots={pots} potId={potId} transactionId={transactionId} />;
