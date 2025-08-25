import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaCertificate, FaExchangeAlt, FaStore } from "react-icons/fa";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/overview", { replace: true });
    }
  }, [location, navigate]);

  const navItems = [
    { label: "Overview", to: "/dashboard/overview", icon: <FaHome /> },
    { label: "Certificates", to: "/dashboard/certificates", icon: <FaCertificate /> },
    { label: "Transactions", to: "/dashboard/transactions", icon: <FaExchangeAlt /> },
    { label: "Marketplace", to: "/dashboard/marketplace", icon: <FaStore /> },
  ];

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