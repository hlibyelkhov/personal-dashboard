import { useEffect, useState } from 'react';

function FinanceTracker() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    const value = parseFloat(amount);

    if (description.trim() === '' || isNaN(value)) {
      setError('Введите описание и корректную сумму (можно с плюсом или минусом)');
      return;
    }

    const newItem = {
      id: Date.now(),
      description,
      amount: value,
    };

    setTransactions([newItem, ...transactions]);
    setDescription('');
    setAmount('');
    setError('');
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="bg-white shadow rounded-xl p-4 dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4">Финансы</h2>

      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}

      <div className="mb-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание"
          className="w-full mb-2 p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Сумма (+ доход, - расход)"
          className="w-full mb-2 p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          onClick={addTransaction}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Добавить
        </button>
      </div>

      <div className="mb-4">
        <p className="font-semibold">
          Баланс:{' '}
          <span className={balance >= 0 ? 'text-green-600' : 'text-red-500'}>
            {balance.toFixed(2)} ₽
          </span>
        </p>
      </div>

      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {transactions.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded p-2"
          >
            <span>{t.description}</span>
            <span className={t.amount >= 0 ? 'text-green-600' : 'text-red-500'}>
              {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)} ₽
            </span>
            <button
              onClick={() => deleteTransaction(t.id)}
              className="text-red-500 hover:text-red-700 ml-4 text-sm"
              title="Удалить"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FinanceTracker;
