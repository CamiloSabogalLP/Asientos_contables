import React, { useState } from 'react';

const AccountingProcessor = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  const processJson = () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!Array.isArray(parsedData)) {
        throw new Error('El JSON debe ser un array de transacciones');
      }
      setTransactions(parsedData);
      setError('');
    } catch (err) {
      setError(`Error al procesar JSON: ${err.message}`);
      setTransactions([]);
    }
  };

  const resetAll = () => {
    setJsonInput('');
    setTransactions([]);
    setError('');
  };

  const calculateTotals = () => {
    let totalDebit = 0;
    let totalCredit = 0;

    transactions.forEach(item => {
      if (item.operationType === 'DEBIT') {
        totalDebit += item.amountInOriginalCurrency || 0;
      } else {
        totalCredit += item.amountInOriginalCurrency || 0;
      }
    });

    return { totalDebit, totalCredit };
  };

  const { totalDebit, totalCredit } = calculateTotals();
  const isBalanced = totalDebit === totalCredit;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Ingresa tus datos contables</h2>
        <textarea
          className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Pega aquí el array con los items del account balance."
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <div className="flex space-x-3 mt-3">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={processJson}
          >
            Analizar Log
          </button>
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
            onClick={resetAll}
          >
            Analizar nuevo asiento contable
          </button>
        </div>
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </div>

      {transactions.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Tabla Contable</h2>
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
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.subAccount?.accountId || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.subAccount?.subAccountId || '0'} - {item.subAccount?.subsubAccountId || '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${item.operationType === 'DEBIT' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {item.operationType || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.amountInOriginalCurrency?.toFixed(2) || '0.00'} {item.currency || ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.amountInSystemCurrency?.toFixed(6) || '0.000000'}
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
            {!isBalanced && (
              <p className="mt-1 text-sm">
                Diferencia: {Math.abs(totalDebit - totalCredit).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountingProcessor;

// DONE