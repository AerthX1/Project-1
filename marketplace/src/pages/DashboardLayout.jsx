import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCertificate,
  FaExchangeAlt,
  FaStore,
  FaUsers,
  FaChartBar,
  FaKey,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userType } = useSelector((state) => state.auth);
  const [featureMap, setFeatureMap] = useState({});

  const [subscription, setSubscription] = useState(null);
  const [planFeatures, setPlanFeatures] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔥 Redirect logic
  useEffect(() => {
    if (!userType) return;

    if (location.pathname === "/dashboard") {
      navigate(
        userType === "organization"
          ? "/dashboard/org-overview"
          : "/dashboard/overview",
        { replace: true }
      );
    }
  }, [location, navigate, userType]);

  // 🔥 Fetch subscription + features
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        if (!user?.id) return;

        // 1. Get subscription
        const subRes = await fetch(
          `${import.meta.env.VITE_API_URL}/payment/subscription/${user.id}`
        );
        const subData = await subRes.json();

        if (subData?.status === "active") {
          setSubscription(subData);

          // 2. Get pricing config
          const pricingRes = await fetch(
            `${import.meta.env.VITE_API_URL}/admin/pricing`
          );
         const pricingData = await pricingRes.json();

const currentPlan = pricingData.plans[subData.plan];
setPlanFeatures(currentPlan?.features || {});

// 🔥 BUILD MAP
const map = {};
pricingData.featureGroups.forEach((group) => {
  group.features.forEach((f) => {
    map[f.label.toLowerCase().replace(/\s/g, "")] = f.key;
  });
});
setFeatureMap(map);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  if (!userType || loading) return <div>Loading...</div>;

  // 🔑 Feature checker
const hasFeature = (label) => {
  if (!subscription) return false;

  const lookup = label.toLowerCase().replace(/\s/g, "");
  const key = featureMap[lookup];

  return planFeatures[key] === true;
};
  // ✅ ALWAYS VISIBLE
  const baseNav = [
    { label: "Overview", to: "/dashboard/overview", icon: <FaHome /> },
    { label: "Certificates", to: "/dashboard/certificates", icon: <FaCertificate /> },
    { label: "Transactions", to: "/dashboard/transactions", icon: <FaExchangeAlt /> },
    { label: "Marketplace", to: "/dashboard/marketplace", icon: <FaStore /> },
  ];

  // 🔥 CONDITIONAL FEATURES
 const premiumNav = [
  {
    label: "Team",
    to: "/dashboard/team",
    icon: <FaUsers />,
    feature: "Team",
  },
  {
    label: "ESG Reports",
    to: "/dashboard/esg-reports",
    icon: <FaChartBar />,
    feature: "ESG Reports",
  },
  {
    label: "API Access",
    to: "/dashboard/api-access",
    icon: <FaKey />,
    feature: "APIAccess",
  },
];
  // 🔥 FINAL NAV
  const navItems = [
    ...baseNav,
    ...premiumNav.filter((item) => hasFeature(item.feature)),
  ];

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md p-5">
        <button
  onClick={() => navigate("/")}
  className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-green-600 transition"
>
  ← Back to Home
</button>
        <h1 className="text-xl font-bold text-green-700 mb-6">AerthX</h1>

        {/* Subscription Badge */}
       {subscription?.status === "active" && (
  <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
    
    <div className="flex items-center justify-between">
      <span className="text-xs uppercase tracking-wide opacity-80">
        Current Plan
      </span>

      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
        Active
      </span>
    </div>

    <div className="mt-2 text-lg font-bold tracking-wide">
      {subscription.plan.toUpperCase()}
    </div>

    <div className="text-xs opacity-80 mt-1">
      Premium access enabled
    </div>
  </div>
)}

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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;