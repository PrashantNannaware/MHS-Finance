import React from 'react';

const transactions = [
  {
    id: 1,
    patient: 'John Doe',
    amount: 125000,
    status: 'Paid',
    date: '2024-03-15',
  },
  {
    id: 2,
    patient: 'Sarah Smith',
    amount: 85000,
    status: 'Pending',
    date: '2024-03-14',
  },
  {
    id: 3,
    patient: 'Mike Johnson',
    amount: 210000,
    status: 'Processing',
    date: '2024-03-14',
  },
  {
    id: 4,
    patient: 'Emily Brown',
    amount: 150000,
    status: 'Paid',
    date: '2024-03-13',
  },
];

const RecentTransactions = () => {
  const formatToINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <p className="font-medium text-gray-900">{transaction.patient}</p>
            <p className="text-sm text-gray-500">{transaction.date}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">{formatToINR(transaction.amount)}</p>
            <span
              className={`text-sm px-2 py-1 rounded ${
                transaction.status === 'Paid'
                  ? 'bg-green-100 text-green-800'
                  : transaction.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {transaction.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;