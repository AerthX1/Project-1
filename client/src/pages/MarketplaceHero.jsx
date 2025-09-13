import React from "react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaChartLine,
  FaLock,
  FaRocket,
  FaGlobe,
  FaCheckCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";
import starterImage from "../assets/marketplacebg.png";
import aerthxlogo from "../assets/aerthxlogo.png";
import goldstandard from "../assets/gold-standard.png";
import verra from "../assets/Verra-Logo.png";

const features = [
  {
    icon: <FaLeaf />,
    title: "Verified Projects",
    text: "Access 100% certified carbon credits from trusted registries like Verra, Gold Standard, and Climate Action Reserve.",
  },
  {
    icon: <FaChartLine />,
    title: "Live Market Analytics",
    text: "Gain real-time insights with live carbon prices, transaction volumes, and project ratings to make informed decisions.",
  },
  {
    icon: <FaGlobe />,
    title: "Global Coverage",
    text: "Support impactful climate projects worldwide, from reforestation to renewable energy initiatives.",
  },
  {
    icon: <FaRocket />,
    title: "Instant Offsetting",
    text: "Buy credits quickly and receive official certificates instantly with a smooth, hassle-free process.",
  },
  {
    icon: <FaLock />,
    title: "Secure Payments",
    text: "All transactions are protected by top-tier payment gateways and advanced encryption for complete security.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Impact Transparency",
    text: "Track and verify your carbon offset contributions, seeing the real-world impact down to the last ton.",
  },
];

const MarketplaceHero = () => {
  const marketplaceLink = `${import.meta.env.VITE_CLIENT_URL}?token=${localStorage.getItem(
    "token"
  )}&userType=${localStorage.getItem(
    "userType"
  )}&user=${encodeURIComponent(localStorage.getItem("user"))}`;

  return (
    <section className="font-sans text-gray-900 overflow-x-hidden">
      <div className="relative h-screen flex items-center justify-center px-6 md:px-12 bg-gradient-to-b from-green-50 to-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-200 via-green-100 to-transparent"></div>
        </div>
        <img
          src={starterImage}
          alt="Marketplace Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-transparent to-white"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl text-center flex flex-col items-center justify-center"
        >
          <img
            src={aerthxlogo}
            alt="Aerthx Logo"
            className="w-48 sm:w-64 md:w-72 mb-10 drop-shadow-lg"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight tracking-tight">
            The Carbon Credit Marketplace for a{" "}
            <span className="text-green-600 drop-shadow-lg">
              Sustainable Future
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-12 max-w-3xl">
            AerthX connects you to certified carbon credit projects worldwide.
            Take meaningful climate action with transparency, trust, and ease.
          </p>
          <motion.a
            href={marketplaceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-4 px-14 rounded-full shadow-2xl overflow-hidden transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative z-10">Explore Marketplace</span>
            <FaExternalLinkAlt className="relative z-10" />
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>
          </motion.a>
        </motion.div>
      </div>

      <div className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative bg-white/30 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-100 transition-all duration-500 transform group"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/80 to-green-50/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 text-3xl mb-6 shadow-md group-hover:bg-green-100 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-8">
            Our Trusted Climate Partners & Registries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-16">
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} 
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.1, filter: "grayscale(0%)" }}
              src={verra}
              alt="Verra"
              className="h-14 sm:h-16 opacity-60 transition duration-300 grayscale hover:grayscale-0"
            />
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.1, filter: "grayscale(0%)" }}
              src={goldstandard}
              alt="Gold Standard"
              className="h-14 sm:h-16 opacity-60 transition duration-300 grayscale hover:grayscale-0"
            />
          </div>
        </div>
      </div>

      <div className="py-20 bg-white text-center relative overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 relative z-10"
        >
          Ready to Make a Real Impact?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto relative z-10"
        >
          Start offsetting your carbon footprint today with verified projects and transparent tracking.
        </motion.p>
        <motion.a
          href={marketplaceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-block bg-green-600 text-white text-lg font-semibold py-4 px-16 rounded-full shadow-xl transition-all duration-300 transform overflow-hidden hover:bg-green-700"
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative z-10">Visit Marketplace</span>
        </motion.a>
      </div>
    </section>
  );
};

export default MarketplaceHero;