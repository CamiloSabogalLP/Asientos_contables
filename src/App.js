import React from 'react';
import AccountingProcessor from './components/AccountingProcessor';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Analizar asientos contables
        </h1>
        <AccountingProcessor />
      </div>
    </div>
  );
};

export default App;

// DONE