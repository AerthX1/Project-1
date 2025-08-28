import React from "react";

const Overview = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-gray-600">Total Carbon Offset</h2>
          <p className="text-2xl font-bold text-green-700">42 Tons</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-gray-600">Certificates Earned</h2>
          <p className="text-2xl font-bold text-green-700">5</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-gray-600">Transactions</h2>
          <p className="text-2xl font-bold text-green-700">₹12,450</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Carbon Offset Progress</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          [Chart Coming Soon]
        </div>
      </div>
    </div>
  );
};

export default Overview;
