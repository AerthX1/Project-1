import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaCertificate, FaExchangeAlt, FaStore, FaUsers, FaChartBar, FaKey } from "react-icons/fa";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userType } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userType) return;

    // Redirect from /dashboard to proper page based on userType
    if (location.pathname === "/dashboard") {
      navigate(
        userType === "organization" ? "/dashboard/org-overview" : "/dashboard/overview",
        { replace: true }
      );
    }
  }, [location, navigate, userType]);

  if (!userType) return <div>Loading...</div>; // wait until userType loads

  // Role-based nav items
  const consumerNav = [
    { label: "Overview", to: "/dashboard/overview", icon: <FaHome /> },
    { label: "Certificates", to: "/dashboard/certificates", icon: <FaCertificate /> },
    { label: "Transactions", to: "/dashboard/transactions", icon: <FaExchangeAlt /> },
    { label: "Marketplace", to: "/dashboard/marketplace", icon: <FaStore /> },
    { label: "Impact Goals", to: "/dashboard/goals", icon: <FaChartBar /> },
  ];

  const businessNav = [
    { label: "Organization", to: "/dashboard/org-overview", icon: <FaHome /> },
    { label: "Certificates", to: "/dashboard/certificates", icon: <FaCertificate /> },
    { label: "Transactions", to: "/dashboard/transactions", icon: <FaExchangeAlt /> },
    { label: "Marketplace", to: "/dashboard/marketplace", icon: <FaStore /> },
    { label: "Team", to: "/dashboard/team", icon: <FaUsers /> },
    { label: "ESG Reports", to: "/dashboard/esg-reports", icon: <FaChartBar /> },
    { label: "API Access", to: "/dashboard/api-access", icon: <FaKey /> },
  ];

  const navItems = userType === "organization" ? businessNav : consumerNav;

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white shadow-md p-5">
        <h1 className="text-xl font-bold text-green-700 mb-6">AerthX</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                location.pathname === item.to
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
