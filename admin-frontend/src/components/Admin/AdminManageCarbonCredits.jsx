import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const API = import.meta.env.VITE_API_URL;

const AdminManageCarbonCredits = ({ onEdit = () => {}, onAdd = () => {} }) => {
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
  const [showArchived, setShowArchived] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [openBulkMenu, setOpenBulkMenu] = useState(false);
  const [selectedCredits, setSelectedCredits] = useState([]);
  const [isBulkSelectMode, setIsBulkSelectMode] = useState(false);

  useEffect(() => {
    fetchCredits();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [credits, filters, showArchived]);

  const fetchCredits = async () => {
    try {
      const res = await axios.get(`${API}/carbon-credits`);
      const sorted = res.data.sort(
        (a, b) => (b.pricePerTon || 0) - (a.pricePerTon || 0)
      );
      setCredits(sorted);
    } catch (err) {
      console.error("Failed to fetch carbon credits", err);
    }
  };

  const applyFilters = () => {
    let tempCredits = [...credits];

    if (filters.status === "archived") {
      tempCredits = tempCredits.filter((credit) => credit.isArchived);
    } else if (filters.status === "active") {
      tempCredits = tempCredits.filter(
        (credit) => credit.isActive && !credit.isArchived
      );
    } else if (filters.status === "inactive") {
      tempCredits = tempCredits.filter(
        (credit) => !credit.isActive && !credit.isArchived
      );
    } else {
      tempCredits = tempCredits.filter((credit) =>
        showArchived ? credit.isArchived : !credit.isArchived
      );
    }

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
      tempCredits = tempCredits.filter(
        (credit) => credit.pricePerTon <= parseFloat(filters.price)
      );
    }
    if (filters.type) {
      tempCredits = tempCredits.filter((credit) =>
        credit.projectType.toLowerCase().includes(filters.type.toLowerCase())
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

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await axios.put(`${API}/admin/toggle-active/${id}`, {
        isActive: !currentStatus,
      });
      fetchCredits();
    } catch (err) {
      console.error("Failed to toggle status", err);
    }
  };

  const handleArchive = async (id) => {
    if (!window.confirm("Are you sure you want to archive this credit?"))
      return;
    try {
      await axios.put(`${API}/admin/archive/${id}`);
      fetchCredits();
    } catch (err) {
      console.error("Failed to archive credit", err);
    }
  };

  const handleUnarchive = async (id) => {
    if (!window.confirm("Are you sure you want to unarchive this credit?"))
      return;
    try {
      await axios.put(`${API}/admin/unarchive/${id}`);
      fetchCredits();
    } catch (err) {
      console.error("Failed to unarchive credit", err);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Title",
      "Name",
      "Price/Ton",
      "Tons",
      "Remaining Tons",
      "Country",
      "Vintage Year",
      "Project Type",
      "Project Developer",
      "Verified By",
      "Retired",
      "Registry Link",
      "Additional Notes",
      "Active",
    ];
    const rows = filteredCredits.map((credit) => [
      credit.title,
      credit.name,
      credit.pricePerTon,
      credit.tons,
      credit.remainingTons,
      credit.country,
      credit.vintageYear,
      credit.projectType,
      credit.projectDeveloper,
      credit.verifiedBy,
      credit.retired ? "Yes" : "No",
      credit.registryLink,
      credit.additionalNotes,
      credit.isActive ? "Yes" : "No",
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach((row) => {
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
      "Title",
      "Name",
      "Price/Ton",
      "Tons",
      "Remaining",
      "Country",
      "Vintage Year",
      "Project Type",
      "Project Developer",
      "Verified By",
      "Retired",
      "Registry Link",
      "Active",
    ];

    const rows = filteredCredits.map((credit) => [
      credit.title || "",
      credit.name || "",
      credit.pricePerTon || "",
      credit.tons || "",
      credit.remainingTons || "",
      credit.country || "",
      credit.vintageYear || "",
      credit.projectType || "",
      credit.projectDeveloper || "",
      credit.verifiedBy || "",
      credit.retired ? "Yes" : "No",
      credit.registryLink || "",
      credit.isActive ? "Yes" : "No",
    ]);

    doc.autoTable({
      startY: 25,
      head: [headers],
      body: rows,
      theme: "grid",
      styles: { fontSize: 8 },
      headStyles: { fillColor: "#28a745" },
    });
    doc.save("carbon_credits.pdf");
  };

  const handleViewDetails = (credit) => {
    setSelectedCredit(credit);
    setOpenMenuId(null);
  };

  const handleCheckboxChange = (id) => {
    setSelectedCredits((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((creditId) => creditId !== id)
        : [...prevSelected, id]
    );
  };

  const handleBulkSelectAll = () => {
    setIsBulkSelectMode(true);
    if (selectedCredits.length === filteredCredits.length) {
      setSelectedCredits([]);
      setIsBulkSelectMode(false);
    } else {
      const allIds = filteredCredits.map((c) => c._id);
      setSelectedCredits(allIds);
    }
  };

  const handleBulkActivateAll = async () => {
    if (selectedCredits.length === 0) {
      alert("No credits selected for bulk activation.");
      return;
    }
    if (
      !window.confirm(
        "Are you sure you want to activate all selected credits?"
      )
    )
      return;
    try {
      await Promise.all(
        selectedCredits.map((id) =>
          axios.put(`${API}/admin/toggle-active/${id}`, { isActive: true })
        )
      );
      fetchCredits();
      setSelectedCredits([]);
      setOpenBulkMenu(false);
      setIsBulkSelectMode(false);
    } catch (err) {
      console.error("Failed to activate selected credits", err);
    }
  };

  const handleBulkDeactivateAll = async () => {
    if (selectedCredits.length === 0) {
      alert("No credits selected for bulk deactivation.");
      return;
    }
    if (
      !window.confirm(
        "Are you sure you want to deactivate all selected credits?"
      )
    )
      return;
    try {
      await Promise.all(
        selectedCredits.map((id) =>
          axios.put(`${API}/admin/toggle-active/${id}`, { isActive: false })
        )
      );
      fetchCredits();
      setSelectedCredits([]);
      setOpenBulkMenu(false);
      setIsBulkSelectMode(false);
    } catch (err) {
      console.error("Failed to deactivate selected credits", err);
    }
  };

  const handleBulkArchiveAll = async () => {
    if (selectedCredits.length === 0) {
      alert("No credits selected for bulk archiving.");
      return;
    }
    if (
      !window.confirm("Are you sure you want to archive all selected credits?")
    )
      return;
    try {
      await Promise.all(
        selectedCredits.map((id) => axios.put(`${API}/admin/archive/${id}`))
      );
      fetchCredits();
      setSelectedCredits([]);
      setOpenBulkMenu(false);
      setIsBulkSelectMode(false);
    } catch (err) {
      console.error("Failed to archive selected credits", err);
    }
  };

  const handleBulkUnarchiveAll = async () => {
    if (selectedCredits.length === 0) {
      alert("No credits selected for bulk unarchiving.");
      return;
    }
    if (
      !window.confirm(
        "Are you sure you want to unarchive all selected credits?"
      )
    )
      return;
    try {
      await Promise.all(
        selectedCredits.map((id) => axios.put(`${API}/admin/unarchive/${id}`))
      );
      fetchCredits();
      setSelectedCredits([]);
      setOpenBulkMenu(false);
      setIsBulkSelectMode(false);
    } catch (err) {
      console.error("Failed to unarchive selected credits", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-3xl font-extrabold text-gray-900">
          📦 Carbon Credit List
        </h2>
        <button
          onClick={onAdd}
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
        >
          ➕ Add Carbon Credit
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 w-full">
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
            <div className="relative">
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-sm"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>

              <button
                onClick={() => setOpenBulkMenu(!openBulkMenu)}
                className="absolute right-0 top-0 mt-2 mr-2 text-gray-600 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaEllipsisV />
              </button>

              {openBulkMenu && (
                <div className="absolute right-0 mt-8 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-fade-in-down">
                  <button
                    onClick={handleBulkSelectAll}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-100 transition-colors rounded-t-lg"
                  >
                    {selectedCredits.length === filteredCredits.length
                      ? "Deselect All"
                      : "Select All"}
                  </button>
                  <button
                    onClick={handleBulkActivateAll}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-100 transition-colors"
                  >
                    Activate Selected
                  </button>
                  <button
                    onClick={handleBulkDeactivateAll}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-100 transition-colors"
                  >
                    Deactivate Selected
                  </button>
                  <button
                    onClick={handleBulkArchiveAll}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-100 transition-colors"
                  >
                    Archive Selected
                  </button>
                  <button
                    onClick={handleBulkUnarchiveAll}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-100 transition-colors rounded-b-lg"
                  >
                    Unarchive Selected
                  </button>
                </div>
              )}
            </div>
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
              {isBulkSelectMode && (
                <input
                  type="checkbox"
                  checked={selectedCredits.includes(credit._id)}
                  onChange={() => handleCheckboxChange(credit._id)}
                  className="mr-4 w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                />
              )}
              <div
                onClick={() => handleViewDetails(credit)}
                className="cursor-pointer"
              >
                <p className="font-semibold text-lg text-gray-800">
                  {credit.name}
                </p>
                <p className="text-sm text-gray-500">
                  ₹{credit.pricePerTon} / ton
                </p>
                <p className="text-xs text-gray-400 mt-1">{credit.country}</p>
                <p className="text-xs text-gray-400">
                  Remaining: {credit.tons} tons
                </p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    credit.isArchived
                      ? "bg-gray-100 text-gray-800"
                      : credit.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {credit.isArchived
                    ? "Archived"
                    : credit.isActive
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenMenuId(openMenuId === credit._id ? null : credit._id)
                  }
                  className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaEllipsisV />
                </button>
                {openMenuId === credit._id && (
                  <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg border border-gray-200 shadow-xl z-10 animate-fade-in-down">
                    <button
                      onClick={() => handleViewDetails(credit)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-100 rounded-t-lg transition-colors"
                    >
                      👁️ View
                    </button>
                    <button
                      onClick={() => handleUpdate(credit)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-100 transition-colors"
                    >
                      ✏️ Update
                    </button>
                    <button
                      onClick={() =>
                        handleToggleActive(credit._id, credit.isActive)
                      }
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {credit.isActive ? "Deactivate" : "Activate"}
                    </button>
                    {credit.isArchived ? (
                      <button
                        onClick={() => handleUnarchive(credit._id)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Unarchive
                      </button>
                    ) : (
                      <button
                        onClick={() => handleArchive(credit._id)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Archive
                      </button>
                    )}
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

      {selectedCredit && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4">
          <div className="relative p-8 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl animate-fade-in-up max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCredit(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✖️
            </button>
            <div className="flex flex-col items-center mb-6">
              {selectedCredit.image ? (
                <img
                  src={selectedCredit.image}
                  alt={selectedCredit.name}
                  className="w-full max-w-md h-60 object-cover rounded-lg shadow-md mb-4"
                />
              ) : (
                <div className="w-full max-w-md h-60 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-lg mb-4">
                  No Project Image Available
                </div>
              )}
              <h3 className="text-3xl font-bold text-gray-900 mb-1 text-center">
                {selectedCredit.title}
              </h3>
              <p className="text-md text-gray-600 text-center">
                {selectedCredit.name}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">
                  Project Overview
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>
                    <span className="font-semibold">Description:</span>
                    <p className="ml-2 mt-1">{selectedCredit.info || "N/A"}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Project Type:</span>{" "}
                    {selectedCredit.projectType || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Vintage Year:</span>{" "}
                    {selectedCredit.vintageYear || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Project Developer:</span>{" "}
                    {selectedCredit.projectDeveloper || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Verified By:</span>{" "}
                    {selectedCredit.verifiedBy || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold">Registry Link:</span>
                    {selectedCredit.registryLink ? (
                      <a
                        href={selectedCredit.registryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline ml-2"
                      >
                        View Registry
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">
                  Credit Details
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>
                    <span className="font-semibold">Total Tons:</span>{" "}
                    {selectedCredit.tons || "0"} tons
                  </div>
                  <div>
                    <span className="font-semibold">Remaining Tons:</span>{" "}
                    {selectedCredit.remainingTons || "0"} tons
                  </div>
                  <div>
                    <span className="font-semibold">Price per Ton:</span> ₹
                    {selectedCredit.pricePerTon || "0.00"}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        selectedCredit.isArchived
                          ? "bg-gray-100 text-gray-800"
                          : selectedCredit.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedCredit.isArchived
                        ? "Archived"
                        : selectedCredit.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Retired:</span>{" "}
                    {selectedCredit.retired ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-6">
              <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">
                  Location & Impact
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <span className="font-semibold">Country:</span>{" "}
                  {selectedCredit.country || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">State:</span>{" "}
                  {selectedCredit.state || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">City:</span>{" "}
                  {selectedCredit.city || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">SDG Alignment:</span>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    {selectedCredit.sdgs && selectedCredit.sdgs.length > 0 ? (
                      selectedCredit.sdgs.map((sdg) => (
                        <li key={sdg}>{sdg}</li>
                      ))
                    ) : (
                      <li>N/A</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {selectedCredit.additionalNotes && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-bold text-lg text-gray-800 mb-2 border-b pb-2">
                  Additional Notes
                </h4>
                <p className="text-sm text-gray-700">
                  {selectedCredit.additionalNotes}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageCarbonCredits;