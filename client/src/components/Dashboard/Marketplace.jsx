import React from "react";

const Marketplace = () => {
  const projects = [
    { id: 1, name: "Reforestation in Amazon", price: 500, tons: 1 },
    { id: 2, name: "Solar Power in Rajasthan", price: 450, tons: 1 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Marketplace</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-white shadow rounded-2xl p-4">
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.tons} Ton = ₹{p.price}</p>
            <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Buy Now
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
          See Full Marketplace →
        </button>
      </div>
    </div>
  );
};

export default Marketplace;
