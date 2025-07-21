import React from "react";
import {
  FaLeaf,
  FaChartLine,
  FaLock,
  FaRocket,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";
import starterImage from "../assets/marketplacebg.png";
import aerthxlogo from "../assets/aerthxlogo.png";
import goldstandard from "../assets/gold-standard.png";
import verra from "../assets/Verra-Logo.png";

const features = [
  {
    icon: <FaLeaf className="text-green-600 text-4xl mb-3" />,
    title: "Verified Projects",
    text: "100% certified carbon credits from registries like Verra, Gold Standard, and Climate Action Reserve.",
  },
  {
    icon: <FaChartLine className="text-blue-500 text-4xl mb-3" />,
    title: "Live Market Analytics",
    text: "Real-time carbon prices, transaction volume, and project ratings at your fingertips.",
  },
  {
    icon: <FaGlobe className="text-yellow-500 text-4xl mb-3" />,
    title: "Global Coverage",
    text: "Support reforestation, clean energy, and more — globally.",
  },
  {
    icon: <FaRocket className="text-red-500 text-4xl mb-3" />,
    title: "Offset in Minutes",
    text: "Buy and receive certificates instantly. Zero delays.",
  },
  {
    icon: <FaLock className="text-purple-600 text-4xl mb-3" />,
    title: "Secure Payments",
    text: "Transactions powered by top-tier payment gateways & encryption.",
  },
  {
    icon: <FaCheckCircle className="text-emerald-600 text-4xl mb-3" />,
    title: "Impact Transparency",
    text: "Track your carbon offset down to the last ton.",
  },
];

const MarketplaceHero = () => {
  return (
    <section className="bg-white text-gray-900">
      <div className="relative min-h-screen w-full overflow-hidden">
        <img
          src={starterImage}
          alt="Marketplace Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 sm:px-12 text-center ">
          <img
            src={aerthxlogo}
            alt="Aerthx Logo"
            className="w-64 sm:w-72 md:w-80 lg:w-96 mb-40 mt-4"
          />
         <h1 className="text-4xl sm:text-6xl font-extrabold mb-10 text-gray-700">
            Powering a Transparent Global Carbon Credit Marketplace
          </h1>
        <p className="text-lg sm:text-xl max-w-2xl text-gray-500">
            Join the movement to fight climate change. Aerthx connects you to
            certified carbon credit projects worldwide — empowering action with
            clarity and trust.
          </p>
          <a
            href={`http://localhost:5174?token=${localStorage.getItem(
              "token"
            )}&userType=${localStorage.getItem(
              "userType"
            )}&user=${encodeURIComponent(localStorage.getItem("user"))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-3 px-10 rounded-xl shadow-md transition duration-300"
          >
            🌍 Explore Marketplace
          </a>
        </div>
      </div>

      <div className="mt-24 px-6 sm:px-12 lg:px-32">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="transition transform group-hover:scale-105">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mt-3 mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 px-6 sm:px-12 lg:px-32 mb-16">
        <p className="text-gray-500 text-sm uppercase tracking-wider mb-6 text-center">
          Our Trusted Climate Partners
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10">
          <img
            src={verra}
            alt="Verra"
            className="h-10 grayscale hover:grayscale-0 transition duration-300"
          />
          <img
            src={goldstandard}
            alt="Gold Standard"
            className="h-10 grayscale hover:grayscale-0 transition duration-300"
          />
          <img
            src="/climateaction-logo.png"
            alt="UN Climate"
            className="h-10 grayscale hover:grayscale-0 transition duration-300"
          />
          <img
            src="/carbonfuture-logo.png"
            alt="Carbonfuture"
            className="h-10 grayscale hover:grayscale-0 transition duration-300"
          />
          <img
            src="/polygon-logo.svg"
            alt="Polygon"
            className="h-8 grayscale hover:grayscale-0 transition duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default MarketplaceHero;
