import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const API = import.meta.env.VITE_API_URL;

const AdminManageCarbonCredits = ({ onEdit }) => {
  const [credits, setCredits] = useState([]);
  const [filteredCredits, setFilteredCredits] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [filters, setFilters] = useState({
    project: "",
    country: "",
    price: "",
    type: "",
    status: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCredits();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [credits, filters]);

  const fetchCredits = async () => {
    try {
      const res = await axios.get(`${API}/carbon-credits`);
      const sorted = res.data.sort((a, b) => (b.pricePerTon || 0) - (a.pricePerTon || 0));
      setCredits(sorted);
    } catch (err) {
      console.error("Failed to fetch carbon credits", err);
    }
  };

  const applyFilters = () => {
    let tempCredits = [...credits];
    if (filters.project) {
      tempCredits = tempCredits.filter((credit) =>
        credit.name.toLowerCase().includes(filters.project.toLowerCase())
      );
    }
    if (filters.country) {
      tempCredits = tempCredits.filter((credit) =>
        credit.country.toLowerCase().includes(filters.country.toLowerCase())
      );
    }
    if (filters.price) {
      tempCredits = tempCredits.filter((credit) =>
        credit.pricePerTon <= parseFloat(filters.price)
      );
    }
    if (filters.type) {
      tempCredits = tempCredits.filter((credit) =>
        credit.type.toLowerCase().includes(filters.type.toLowerCase())
      );
    }
    if (filters.status) {
      tempCredits = tempCredits.filter((credit) =>
        credit.status.toLowerCase() === filters.status.toLowerCase()
      );
    }
    setFilteredCredits(tempCredits);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this credit?")) return;
    try {
      await axios.delete(`${API}/carbon-credits/${id}`);
      fetchCredits();
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const handleUpdate = (credit) => {
    if (typeof onEdit === "function") onEdit(credit._id);
  };

  const handleExportCSV = () => {
    const headers = ["Title", "Name", "Price/Ton", "Tons", "Country", "Vintage Year", "Project Type", "Project Developer", "Verified By", "Retired", "Registry Link", "Additional Notes"];
    const rows = filteredCredits.map(credit => [
      credit.title,
      credit.name,
      credit.pricePerTon,
      credit.tons,
      credit.country,
      credit.vintageYear,
      credit.projectType,
      credit.projectDeveloper,
      credit.verifiedBy,
      credit.retired ? 'Yes' : 'No',
      credit.registryLink,
      credit.additionalNotes,
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach(row => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "carbon_credits.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Carbon Credit List", 14, 20);

    if (filteredCredits.length === 0) {
      doc.text("No data to export.", 14, 30);
      doc.save("carbon_credits.pdf");
      return;
    }

    const headers = [
      "Title", "Name", "Price/Ton", "Tons", "Country", "Vintage Year", 
      "Project Type", "Project Developer", "Verified By", "Retired", 
      "Registry Link", "Additional Notes"
    ];
    
    const rows = filteredCredits.map(credit => [
      credit.title || '',
      credit.name || '',
      credit.pricePerTon || '',
      credit.tons || '',
      credit.country || '',
      credit.vintageYear || '',
      credit.projectType || '',
      credit.projectDeveloper || '',
      credit.verifiedBy || '',
      credit.retired ? 'Yes' : 'No',
      credit.registryLink || '',
      credit.additionalNotes || '',
    ]);

    doc.autoTable({
      startY: 25,
      head: [headers],
      body: rows,
      theme: 'grid',
      styles: {
        fontSize: 8,
      },
      headStyles: {
        fillColor: '#28a745',
      },
    });
    doc.save("carbon_credits.pdf");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
        📦 Carbon Credit List
      </h2>
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
            <input
              type="text"
              name="project"
              placeholder="Search by Project..."
              value={filters.project}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-sm"
            />
            <input
              type="text"
              name="country"
              placeholder="Search by Country..."
              value={filters.country}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-sm"
            />
            <input
              type="number"
              name="price"
              placeholder="Max Price (₹)"
              value={filters.price}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-sm"
            />
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-sm"
            >
              <option value="">All Types</option>
              <option value="forestry">Forestry</option>
              <option value="renewable energy">Renewable Energy</option>
              <option value="agriculture">Agriculture</option>
            </select>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-sm"
            >
              <option value="">All Statuses</option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <div className="flex space-x-2 w-full lg:w-auto justify-end">
            <button
              onClick={handleExportCSV}
              className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 text-sm flex-grow lg:flex-grow-0"
            >
              Export CSV
            </button>
            <button
              onClick={handleExportPDF}
              className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200 text-sm flex-grow lg:flex-grow-0"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {filteredCredits.length > 0 ? (
          filteredCredits.map((credit) => (
            <div
              key={credit._id}
              className="flex justify-between items-center px-6 py-4 bg-white rounded-xl shadow-md border border-gray-200 transition-transform duration-200 hover:scale-[1.01]"
            >
              <div>
                <p className="font-semibold text-lg text-gray-800">{credit.name}</p>
                <p className="text-sm text-gray-500">₹{credit.pricePerTon} / ton</p>
                <p className="text-xs text-gray-400 mt-1">{credit.country}</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setOpenMenuId(openMenuId === credit._id ? null : credit._id)}
                  className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaEllipsisV />
                </button>
                {openMenuId === credit._id && (
                  <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg border border-gray-200 shadow-xl z-10 animate-fade-in-down">
                    <button
                      onClick={() => handleUpdate(credit)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-100 rounded-t-lg transition-colors"
                    >
                      ✏️ Update
                    </button>
                    <button
                      onClick={() => handleDelete(credit._id)}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-b-lg transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            No carbon credits found matching the criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageCarbonCredits;