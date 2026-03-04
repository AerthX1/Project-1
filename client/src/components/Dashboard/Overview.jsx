import React from "react";

const Overview = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Your Sustainability Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Total Credits Purchased</p>
          <h3 className="text-3xl font-bold mt-1">0</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Total CO₂ Offset</p>
          <h3 className="text-3xl font-bold mt-1">0 tons</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Certificates</p>
          <h3 className="text-3xl font-bold mt-1">0</h3>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-3">Recent Activity</h3>
        <p className="text-gray-500">No activity yet.</p>
      </div>
    </div>
  );
};

export default Overview;
