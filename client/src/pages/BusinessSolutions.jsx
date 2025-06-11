import React from "react";
import { Link } from "react-router-dom";
// import BusinessImage from "../assets/business.jpg";

const BusinessSolutions = () => {
  return (
    <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto text-gray-800 space-y-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700">Solutions for Businesses</h1>
        <p className="mt-2 text-base text-gray-600 max-w-2xl mx-auto">
          Empower your ESG goals with advanced tools to measure, manage, and report emissions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-3">ESG Management Made Simple</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Automated emissions tracking</li>
            <li>Custom ESG reports (CSV, PDF)</li>
            <li>Goal-based carbon reduction plans</li>
            <li>Role-based access for teams</li>
          </ul>
        </div>
        {/* <img src={BusinessImage} alt="ESG Dashboard" className="rounded-lg shadow-lg" /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* <img src={BusinessImage} alt="Integrations" className="rounded-lg shadow-lg" /> */}
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-3">Collaborate & Integrate</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Multi-user roles with custom permissions</li>
            <li>API access for dashboards & analytics</li>
            <li>Seamless ERP or CRM integrations</li>
            <li>Slack, Microsoft Teams, and more</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-3">Advanced Reporting & Compliance</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Weekly or monthly ESG reporting</li>
            <li>Support for GHG Protocol, CDP, and SEBI ESG frameworks</li>
            <li>Auditable report history</li>
            <li>Downloadable investor summaries</li>
          </ul>
        </div>
        {/* <img src={BusinessImage} alt="Reporting Chart" className="rounded-lg shadow-lg" /> */}
      </div>

      <div className="text-center pt-8">
        <h3 className="text-2xl font-semibold text-green-700">Ready to Elevate Your ESG Game?</h3>
        <Link
          to="/pricing"
          className="mt-4 inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          View Business Pricing
        </Link>
      </div>
    </div>
  );
};

export default BusinessSolutions;