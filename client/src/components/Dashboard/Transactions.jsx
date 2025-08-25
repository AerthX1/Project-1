import React from "react";

const Transactions = () => {
  const transactions = [
    { id: 1, project: "Solar Project", amount: 5000, tons: 10, date: "2025-08-01" },
    { id: 2, project: "Wind Farm", amount: 2000, tons: 4, date: "2025-07-28" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Transactions</h1>

      <table className="w-full bg-white shadow rounded-2xl overflow-hidden">
        <thead className="bg-green-100 text-left">
          <tr>
            <th className="p-4">Project</th>
            <th className="p-4">Tons</th>
            <th className="p-4">Amount (₹)</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{t.project}</td>
              <td className="p-4">{t.tons}</td>
              <td className="p-4">{t.amount}</td>
              <td className="p-4">{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
