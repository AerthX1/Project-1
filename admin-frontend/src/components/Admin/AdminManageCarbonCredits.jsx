import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const AdminManageCarbonCredits = () => {
  const [credits, setCredits] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
const navigate = useNavigate();

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    try {
      const res = await axios.get(`${API}/carbon-credits`);
      const sorted = res.data.sort((a, b) => (b.pricePerTon || 0) - (a.pricePerTon || 0));
      setCredits(sorted);
    } catch (err) {
      console.error("Failed to fetch carbon credits", err);
    }
  };
  

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this credit?")) return;
    try {
      await axios.delete(`${API}/carbon-credits/${id}`);
      fetchCredits();
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

const handleUpdate = (credit) => {
   
    navigate(`/admin/carbon-credits/update/${credit._id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📦 Carbon Credit List</h2>
      <div className="space-y-4">
        {credits.map((credit) => (
          <div
            key={credit._id}
            className="flex justify-between items-center px-6 py-4 bg-white rounded-xl shadow border border-gray-200"
          >
            <div>
              <p className="font-semibold text-lg text-gray-800">{credit.name}</p>
              <p className="text-sm text-gray-500">₹{credit.pricePerTon} / ton</p>
            </div>

            <div className="relative">
              <button
                onClick={() => setOpenMenuId(openMenuId === credit._id ? null : credit._id)}
                className="text-gray-600 hover:text-gray-800 p-2"
              >
                <FaEllipsisV />
              </button>

              {openMenuId === credit._id && (
                <div className="absolute right-0 top-10 w-28 bg-white rounded-lg border shadow z-10">
                  <button
                    onClick={() => handleUpdate(credit)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-green-100"
                  >
                    ✏️ Update
                  </button>
                  <button
                    onClick={() => handleDelete(credit._id)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminManageCarbonCredits;
