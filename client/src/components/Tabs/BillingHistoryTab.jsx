import React from "react";

const BillingHistoryTab = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Billing History</h3>
      <table className="min-w-full bg-white shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm text-gray-600">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Invoice</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800">
          <tr className="border-t">
            <td className="px-4 py-3">June 10, 2025</td>
            <td className="px-4 py-3">₹499</td>
            <td className="px-4 py-3">Paid</td>
            <td className="px-4 py-3">
              <a href="#" className="text-green-600 hover:underline">Download</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BillingHistoryTab;
