import React, { useState } from "react";
import { FaDollarSign, FaTags, FaEdit, FaSave, FaTimes, FaPlus, FaCheckCircle, FaMinusCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Defines the structure of features for editing
const featureGroups = [
  {
    groupTitle: "Dashboard & Reports",
    features: [
      { key: "dashboard", label: "Dashboard Access" },
      { key: "esgReports", label: "ESG Reports Frequency" },
      { key: "kpiReports", label: "Custom KPI Reports" },
    ],
  },
  {
    groupTitle: "Carbon Credits",
    features: [
      { key: "carbonCredits", label: "Carbon Credits Allowed" },
    ],
  },
  {
    groupTitle: "Support & Collaboration",
    features: [
      { key: "support", label: "Support Level" },
      { key: "teamTools", label: "Team Collaboration Tools" },
      { key: "dedicatedManager", label: "Dedicated Manager" },
    ],
  },
  {
    groupTitle: "Extras",
    features: [
      { key: "customApi", label: "Custom API Access" },
      { key: "compliance", label: "Compliance Advisory" },
    ],
  },
];

const initialPlans = {
  Basic: {
    monthly: 499,
    yearly: 4999,
    highlight: false,
    features: {
      dashboard: true,
      esgReports: "Monthly",
      kpiReports: false,
      carbonCredits: "Up to 100",
      support: "Email Support",
      teamTools: false,
      dedicatedManager: false,
      customApi: false,
      compliance: false,
    },
  },
  Pro: {
    monthly: 1999,
    yearly: 19999,
    highlight: true,
    features: {
      dashboard: true,
      esgReports: "Weekly",
      kpiReports: false,
      carbonCredits: "Up to 1,000",
      support: "24h Priority Support",
      teamTools: true,
      dedicatedManager: false,
      customApi: false,
      compliance: false,
    },
  },
  Enterprise: {
    monthly: "Custom",
    yearly: "Custom",
    highlight: false,
    features: {
      dashboard: "Unlimited",
      esgReports: "Custom",
      kpiReports: true,
      carbonCredits: "Unlimited",
      support: "Dedicated Manager",
      teamTools: true,
      dedicatedManager: true,
      customApi: true,
      compliance: true,
    },
  },
};

const AdminManagePricing = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });

  const handlePriceChange = (planName, period, value) => {
    setPlans(prev => ({
      ...prev,
      [planName]: {
        ...prev[planName],
        [period]: value,
      },
    }));
  };

  const handleFeatureChange = (planName, featureKey, value) => {
    // If the feature is a boolean (like kpiReports), toggle it
    if (typeof plans[planName].features[featureKey] === 'boolean') {
        value = !plans[planName].features[featureKey];
    }
    
    setPlans(prev => ({
      ...prev,
      [planName]: {
        ...prev[planName],
        features: {
          ...prev[planName].features,
          [featureKey]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    // Basic validation (e.g., check if monthly/yearly fields are numbers or "Custom" for Basic/Pro)
    let hasError = false;
    Object.keys(plans).forEach(planName => {
      if (planName !== "Enterprise") {
        const monthly = plans[planName].monthly;
        const yearly = plans[planName].yearly;
        if (monthly !== "Custom" && (isNaN(Number(monthly)) || Number(monthly) < 0)) hasError = true;
        if (yearly !== "Custom" && (isNaN(Number(yearly)) || Number(yearly) < 0)) hasError = true;
      }
    });

    if (hasError) {
      setStatus({ message: "Error: Please enter valid numbers for prices (or 'Custom').", type: "error" });
      return;
    }

    // In a real application, this would be an API call (e.g., axios.put('/api/admin/pricing', plans))
    console.log("Saving updated plans:", plans);
    setStatus({ message: "Pricing plans successfully updated!", type: "success" });
    setIsEditing(false);
    
    // Clear status after a few seconds
    setTimeout(() => setStatus({ message: "", type: "" }), 4000);
  };

  const renderFeatureInput = (planName, featureKey, value) => {
    if (typeof value === 'boolean') {
        return (
            <button
                onClick={() => handleFeatureChange(planName, featureKey, null)}
                className={`flex items-center justify-center w-full py-2 rounded transition-all duration-200 ${
                    value
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
            >
                {value ? <FaCheckCircle size={16} /> : <FaTimes size={16} />}
            </button>
        );
    }
    
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => handleFeatureChange(planName, featureKey, e.target.value)}
            className="w-full text-center p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white shadow-inner text-sm"
        />
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <FaTags className="text-green-600" /> Manage Pricing Plans
        </h2>
        <div className="flex gap-4">
          <AnimatePresence>
            {status.message && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`py-2 px-4 rounded-lg font-semibold text-sm ${
                  status.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {status.message}
              </motion.div>
            )}
          </AnimatePresence>
          {isEditing ? (
            <motion.button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSave /> Save Changes
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEdit /> Edit Plans
            </motion.button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-xl border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 w-1/4">
                Feature / Price
              </th>
              {Object.keys(plans).map(planName => (
                <th
                  key={planName}
                  className={`px-6 py-4 text-center text-lg font-extrabold uppercase tracking-wider ${
                    plans[planName].highlight ? 'text-green-700' : 'text-gray-800'
                  }`}
                >
                  {planName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Price Rows */}
            <tr className="bg-green-50">
              <td className="px-6 py-4 whitespace-nowrap font-bold text-green-700 sticky left-0 bg-green-50 z-10">
                <FaDollarSign className="inline mr-2" /> Monthly Price (₹)
              </td>
              {Object.keys(plans).map(planName => (
                <td key={`${planName}-monthly`} className="px-6 py-3 whitespace-nowrap text-center">
                  {isEditing ? (
                    <input
                      type="text"
                      value={plans[planName].monthly}
                      onChange={(e) => handlePriceChange(planName, "monthly", e.target.value)}
                      className="w-24 text-center p-2 border border-green-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white font-bold"
                    />
                  ) : (
                    <span className="text-xl font-extrabold text-gray-900">
                      {plans[planName].monthly === "Custom" ? "Contact Sales" : `₹${plans[planName].monthly}`}
                    </span>
                  )}
                </td>
              ))}
            </tr>
            <tr className="bg-green-50">
              <td className="px-6 py-4 whitespace-nowrap font-bold text-green-700 sticky left-0 bg-green-50 z-10">
                <FaDollarSign className="inline mr-2" /> Yearly Price (₹)
              </td>
              {Object.keys(plans).map(planName => (
                <td key={`${planName}-yearly`} className="px-6 py-3 whitespace-nowrap text-center">
                  {isEditing ? (
                    <input
                      type="text"
                      value={plans[planName].yearly}
                      onChange={(e) => handlePriceChange(planName, "yearly", e.target.value)}
                      className="w-24 text-center p-2 border border-green-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white font-bold"
                    />
                  ) : (
                    <span className="text-xl font-extrabold text-gray-900">
                      {plans[planName].yearly === "Custom" ? "Contact Sales" : `₹${plans[planName].yearly}`}
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Feature Rows */}
            {featureGroups.map(group => (
              <React.Fragment key={group.groupTitle}>
                <tr className="bg-gray-100">
                  <td
                    colSpan={Object.keys(plans).length + 1}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-100 z-10"
                  >
                    {group.groupTitle}
                  </td>
                </tr>
                {group.features.map(feature => (
                  <tr key={feature.key}>
                    <td className="px-6 py-3 whitespace-nowrap font-medium text-gray-800 sticky left-0 bg-white z-10">
                      {feature.label}
                    </td>
                    {Object.keys(plans).map(planName => (
                      <td key={`${planName}-${feature.key}`} className="px-6 py-2 text-center">
                        {isEditing ? (
                            renderFeatureInput(planName, feature.key, plans[planName].features[feature.key])
                        ) : (
                          <div className="flex items-center justify-center">
                            {typeof plans[planName].features[feature.key] === 'boolean' ? (
                              plans[planName].features[feature.key] ? (
                                <FaCheckCircle className="text-green-500" size={20} />
                              ) : (
                                <FaTimes className="text-red-400" size={20} />
                              )
                            ) : (
                              <span className={`text-sm font-medium ${plans[planName].features[feature.key] === 'Unlimited' ? 'text-blue-600' : 'text-gray-700'}`}>
                                {plans[planName].features[feature.key]}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManagePricing;