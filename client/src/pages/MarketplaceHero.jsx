import React, { useMemo } from "react";
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const MarketplaceHero = () => {
 const marketplaceLink =
  localStorage.getItem("token")
    ? `${import.meta.env.VITE_CLIENT_URL}?token=${localStorage.getItem(
        "token"
      )}&userType=${localStorage.getItem(
        "userType"
      )}&user=${encodeURIComponent(localStorage.getItem("user"))}`
    : import.meta.env.VITE_CLIENT_URL;

  return (
    <section className="font-sans text-gray-900 overflow-x-hidden">
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 bg-gradient-to-b from-green-50 to-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-200 via-green-100 to-transparent"></div>
        </div>
        <img
          src={starterImage}
          alt="Marketplace Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-transparent to-white"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl text-center flex flex-col items-center justify-center"
        >
          <img
            src={aerthxlogo}
            alt="Aerthx Logo"
            className="w-44 sm:w-60 md:w-72 mb-10 drop-shadow-md will-change-transform"
          />
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-extrabold mb-4 sm:mb-6 text-gray-900 leading-tight tracking-tight">
            The Carbon Credit Marketplace for a{" "}
            <span className="text-green-600 drop-shadow">
              Sustainable Future
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-10 max-w-2xl px-2">
            AerthX connects you to certified carbon credit projects worldwide.
            Take meaningful climate action with transparency, trust, and ease.
          </p>
          <motion.a
            href={marketplaceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-4 px-14 rounded-full shadow-lg transition-transform duration-300 will-change-transform"
            whileHover={{ scale: 1.03 }}
          >
            <span>Explore Marketplace</span>
            <FaExternalLinkAlt />
          </motion.a>
        </motion.div>
      </div>

      <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 bg-gray-50">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.04 }}
              className="relative bg-white rounded-3xl p-8 shadow-md border border-gray-100 transition-all duration-300 will-change-transform"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 text-3xl mb-6 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="py-10 sm:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-6">
            Our Trusted Climate Partners & Registries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <motion.img
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              src={verra}
              alt="Verra"
              className="h-10 sm:h-14 md:h-16 opacity-70 grayscale hover:grayscale-0 transition duration-300 will-change-transform"
            />
            <motion.img
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              src={goldstandard}
              alt="Gold Standard"
              className="h-10 sm:h-14 md:h-16 opacity-70 grayscale hover:grayscale-0 transition duration-300 will-change-transform"
            />
          </div>
        </div>
      </div>

      <div className="py-12 sm:py-16 md:py-20 bg-white text-center px-4 relative overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl md:text-4xl font-extrabold text-gray-900 mb-6"
        >
          Ready to Make a Real Impact?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
         className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
        >
          Start offsetting your carbon footprint today with verified projects
          and transparent tracking.
        </motion.p>
        <motion.a
          href={marketplaceLink}
          target="_blank"
          rel="noopener noreferrer"
         className="relative inline-block w-full sm:w-auto bg-green-600 text-white text-sm sm:text-lg font-semibold py-3 sm:py-4 px-6 sm:px-12 rounded-full shadow-md transition-transform duration-300 hover:bg-green-700"
          whileHover={{ scale: 1.03 }}
        >
          Visit Marketplace
        </motion.a>
      </div>
    </section>
  );
};

export default MarketplaceHero;
