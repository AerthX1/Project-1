import React from "react";

const Certificates = () => {
  const certificates = [
    { id: 1, project: "Amazon Rainforest", tons: 10, date: "2025-07-12" },
    { id: 2, project: "Solar Energy Project", tons: 5, date: "2025-08-01" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Certificates</h1>

      <div className="space-y-4">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-2xl shadow p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{cert.project}</h2>
              <p className="text-gray-600">{cert.tons} Tons | {cert.date}</p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
