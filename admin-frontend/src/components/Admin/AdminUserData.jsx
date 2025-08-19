import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMoreVertical } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL;

const AdminUserData = () => {
  const [activeTab, setActiveTab] = useState("individual");
  const [individuals, setIndividuals] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [viewUser, setViewUser] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    activeTab === "individual" ? fetchIndividuals() : fetchOrganizations();
  }, [activeTab]);

  const fetchIndividuals = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/individuals`);
      setIndividuals(res.data);
    } catch (err) {
      console.error("Failed to load individual users", err);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/organizations`);
      setOrganizations(res.data);
    } catch (err) {
      console.error("Failed to load organization users", err);
    }
  };

  const filterData = (data) => {
    return data.filter((item) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        item._id.toLowerCase().includes(searchLower) ||
        (item.fullName && item.fullName.toLowerCase().includes(searchLower)) ||
        (item.orgName && item.orgName.toLowerCase().includes(searchLower))
      );
    });
  };

  const handleDelete = async (id, type) => {
    try {
      const endpoint =
        type === "individual"
          ? `${API_URL}/admin/individuals/${id}`
          : `${API_URL}/admin/organizations/${id}`;

      await axios.delete(endpoint);

      if (type === "individual") {
        setIndividuals((prev) => prev.filter((user) => user._id !== id));
      } else {
        setOrganizations((prev) => prev.filter((org) => org._id !== id));
      }

      setDropdownVisible(null);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const toggleDropdown = (id) => {
    setDropdownVisible((prev) => (prev === id ? null : id));
  };

  const handleView = (user) => {
    setViewUser(user);
    setDropdownVisible(null);
  };

  const renderRow = (item, type) => (
    <div
      key={item._id}
      className="grid grid-cols-4 items-center bg-white shadow-sm rounded-lg px-4 py-3 mb-2 hover:shadow-md relative"
    >
      <div className="text-sm text-gray-500 break-all">{item._id}</div>
      <div className="truncate text-gray-800 font-medium">
        {type === "individual" ? item.fullName : item.orgName}
      </div>
      <div className="truncate text-gray-600">{item.email}</div>
      <div className="relative flex justify-end">
        <FiMoreVertical
          className="text-xl cursor-pointer hover:text-gray-800"
          onClick={() => toggleDropdown(item._id)}
        />
        {dropdownVisible === item._id && (
          <div className="absolute right-0 top-6 z-10 bg-white border shadow rounded w-36">
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => handleView(item)}
            >
              View
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-red-100 text-red-600"
              onClick={() => handleDelete(item._id, activeTab)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const currentData = activeTab === "individual" ? individuals : organizations;
  const filteredData = filterData(currentData);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
       <div className="flex gap-4">
  <button
    className={`px-4 py-2 rounded ${
      activeTab === "individual"
        ? "bg-green-600 text-white"
        : "bg-gray-200 text-gray-800"
    }`}
    onClick={() => setActiveTab("individual")}
  >
    Individual ({filterData(individuals).length})
  </button>
  <button
    className={`px-4 py-2 rounded ${
      activeTab === "organization"
        ? "bg-green-600 text-white"
        : "bg-gray-200 text-gray-800"
    }`}
    onClick={() => setActiveTab("organization")}
  >
    Organization ({filterData(organizations).length})
  </button>
</div>

        <div className="relative w-64">
  <input
    type="text"
    placeholder="Search by ID, Name, or Org"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
  />
  <span className="absolute left-3 top-2.5 text-gray-400">
    🔍
  </span>
</div>

      </div>

      <div className="grid grid-cols-4 font-semibold text-gray-700 mb-2 px-4">
        <span>ID</span>
        <span>Name</span>
        <span>Email</span>
        <span className="text-right pr-4">Actions</span>
      </div>

      <div className="space-y-2">
        {filteredData.length > 0 ? (
          filteredData.map((item) => renderRow(item, activeTab))
        ) : (
          <p className="text-center text-gray-500 py-6">No matching users found.</p>
        )}
      </div>

      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 relative">
            <h2 className="text-2xl font-bold text-green-700 mb-4">User Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {Object.entries(viewUser).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-gray-500 font-semibold capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>
                  <span className="text-gray-700 break-all">{String(value)}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setViewUser(null)}
              className="absolute top-3 right-4 text-gray-400 hover:text-black text-2xl"
              title="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserData;
