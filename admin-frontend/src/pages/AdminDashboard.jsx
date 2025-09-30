import React, { useState } from "react";
import StatsOverview from "../components/Admin/StatsOverview";
import IncomeChart from "../components/Admin/IncomeChart";
import LiveUserControl from "../components/Admin/LiveUserControl";
import CarbonInventory from "../components/Admin/CarbonInventory";
import AdminControls from "../components/Admin/AdminControls";
import AdminAddCarbonCredit from "../components/Admin/AdminAddCarbonCredit"; 
import AdminManageCarbonCredits from "../components/Admin/AdminManageCarbonCredits";
import AdminUpdateCarbonCredit from "../components/Admin/AdminUpdateCarbonCredit"; 
import AdminUserData from "../components/Admin/AdminUserData";


import {
  FaTachometerAlt,
  FaChartBar,
  FaUsers,
  FaLeaf,
  FaCogs,
  FaPlusCircle,
  FaEdit,
  FaClipboardList,
} from "react-icons/fa";
import AdminUserReports from "../components/Admin/AdminUserReports";

const navItems = [
  { id: "overview", icon: <FaTachometerAlt />, label: "Overview" },
  { id: "income", icon: <FaChartBar />, label: "Income Chart" },
  { id: "users", icon: <FaUsers />, label: "Live Users" },
  { id: "inventory", icon: <FaLeaf />, label: "Carbon Inventory" },
  { id: "controls", icon: <FaCogs />, label: "Controls" },  
  { id: "managecredits", icon: <FaEdit />, label: "Manage Credits" },
  { id: "userdata", icon: <FaUsers />, label: "User Data" }, 
{ id: "userreports", icon: <FaClipboardList />, label: "User Reports" },



];

const AdminDashboard = () => {
  const [selectedCreditId, setSelectedCreditId] = useState(null); 
  const [selected, setSelected] = useState("overview"); 

const renderContent = () => {
  if (selectedCreditId) {
    return <AdminUpdateCarbonCredit id={selectedCreditId} goBack={() => setSelectedCreditId(null)} />;
  }
    switch (selected) {
      case "overview":
        return <StatsOverview />;
      case "income":
        return <IncomeChart />;
      case "users":
        return <LiveUserControl />;
      case "inventory":
        return <CarbonInventory />;
      case "controls":
        return <AdminControls />;
 case "managecredits":
  return (
    <AdminManageCarbonCredits 
      onEdit={(id) => setSelectedCreditId(id)} 
      onAdd={() => setSelected("addcredit")} 
    />
  );
      case "addcredit":
        return <AdminAddCarbonCredit />;
        case "userdata":
  return <AdminUserData />;
  case "userreports": 
        return <AdminUserReports />;
      default:
        return <StatsOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <aside className="w-64 bg-black text-white min-h-screen p-6 hidden md:block">
        <div className="text-2xl font-bold mb-10 text-green-400">Aearthex Admin</div>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left hover:bg-green-700 ${
                selected === item.id ? "bg-green-600" : ""
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <header className="mb-6 border-b pb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-3xl font-bold">
            {navItems.find((item) => item.id === selected)?.label || "Dashboard"}
          </h1>
          <span className="text-sm text-gray-500 mt-2 md:mt-0">
            Last updated: {new Date().toLocaleString()}
          </span>
        </header>

        <div className="bg-gray-50 rounded-xl shadow p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
