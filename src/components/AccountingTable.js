import React, { useState } from 'react';

const AccountingTable = ({ data }) => {
  const [transactions] = useState(data);

  const calculateTotals = () => {
    let totalDebit = 0;
    let totalCredit = 0;

    transactions.forEach(item => {
      if (item.operationType === 'DEBIT') {
        totalDebit += item.amountInOriginalCurrency;
      } else {
        totalCredit += item.amountInOriginalCurrency;
      }
    });

    return { totalDebit, totalCredit };
  };

  const { totalDebit, totalCredit } = calculateTotals();
  const isBalanced = totalDebit === totalCredit;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuenta ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcuenta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto (Sistema)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.subAccount.accountId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.subAccount.subAccountId} - {item.subAccount.subsubAccountId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${item.operationType === 'DEBIT' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {item.operationType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.amountInOriginalCurrency} {item.currency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.amountInSystemCurrency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Total Débitos</h3>
          <p className="mt-1 text-2xl font-semibold text-red-600">{totalDebit.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Total Créditos</h3>
          <p className="mt-1 text-2xl font-semibold text-green-600">{totalCredit.toFixed(2)}</p>
        </div>
      </div>

      <div className={`mt-4 p-4 rounded-lg ${isBalanced ? 'bg-green-50' : 'bg-red-50'}`}>
        <p className={`text-sm ${isBalanced ? 'text-green-800' : 'text-red-800'}`}>
          {isBalanced ? '✅ Las cuentas están balanceadas' : '⚠️ Las cuentas NO están balanceadas'}
        </p>
      </div>
    </div>
  );
};

export default AccountingTable;

// DONE