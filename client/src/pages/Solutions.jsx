import React from "react";
import { Link } from "react-router-dom";

const Solutions = () => {
  return (
    <div className="px-4 md:px-12 py-10 max-w-6xl mx-auto text-gray-800 space-y-10">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700">
          Our Solutions
        </h1>
        <p className="mt-2 text-base text-gray-600 max-w-xl mx-auto">
          Discover tailored carbon offset services for every kind of user — from individuals to enterprises.
        </p>
      </div>

      <div className="flex flex-col md:flex-col justify-between gap-6">
        <section className="flex-1 border border-green-300 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 bg-white">
          <h2 className="text-xl md:text-2xl font-semibold text-green-700">For Businesses</h2>
          <p className="mt-3 text-gray-700">
            Scalable carbon credit solutions, live ESG dashboards, automated reporting, and dedicated API access for large organizations.
          </p>
          <Link
            to="/solutions/business"
            className="inline-block mt-5 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Learn More
          </Link>
        </section>

        <section className="flex-1 border border-green-300 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 bg-white">
          <h2 className="text-xl md:text-2xl font-semibold text-green-700">For Individuals</h2>
          <p className="mt-3 text-gray-700">
            Offset your carbon footprint, track personal impact, and earn downloadable certificates backed by blockchain.
          </p>
          <Link
            to="/solutions/individuals"
            className="inline-block mt-5 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Learn More
          </Link>
        </section>

        <section className="flex-1 border border-green-300 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 bg-white">
          <h2 className="text-xl md:text-2xl font-semibold text-green-700">API & Integration</h2>
          <p className="mt-3 text-gray-700">
            Plug Aerthx into your product. Use developer APIs, embed widgets, and manage enterprise impact with seamless integration.
          </p>
          <Link
            to="/solutions/api"
            className="inline-block mt-5 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Learn More
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Solutions;
