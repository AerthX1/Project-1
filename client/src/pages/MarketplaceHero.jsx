import React from "react";
import {
  FaLeaf,
  FaChartLine,
  FaLock,
  FaRocket,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";
import starterImage from "../assets/starterImage.jpeg";
import aerthxlogo from "../assets/AerthxLogo.jpg";
import goldstandard from "../assets/gold-standard.png";
import verra from "../assets/Verra-Logo.png";

const MarketplaceHero = () => {

  return (
    <section className="bg-white">
      <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden shadow-sm">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${starterImage})` }}
        ></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-8">
          <img
            src={aerthxlogo}
            alt="Aearthex Logo"
            className="w-50 h-50 object-contain hover:scale-110 transition duration-300"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 leading-tight tracking-tight mt-4">
            Powering a Transparent Global Carbon Credit Marketplace
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-700">
            Join the movement to fight climate change. Aearthex connects you to
            certified carbon credit projects across the globe — empowering
            conscious climate action with clarity and trust.
          </p>

<a
  href={`http://localhost:5174?token=${localStorage.getItem("token")}&userType=${localStorage.getItem("userType")}&user=${encodeURIComponent(localStorage.getItem("user"))}`}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-25 bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-14 rounded-xl border-2"
>
  🌍 Explore Marketplace
</a>


        </div>
      </div>

      <div className="mt-20 px-6 sm:px-12 lg:px-32">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[
            {
              icon: <FaLeaf className="text-green-600 text-4xl mb-3" />,
              title: "Verified Projects",
              text: "Access 100% certified carbon credits by trusted registries like Verra, Gold Standard, and Climate Action Reserve.",
            },
            {
              icon: <FaChartLine className="text-blue-500 text-4xl mb-3" />,
              title: "Live Market Analytics",
              text: "Monitor real-time carbon prices, transaction volumes, and project ratings across the ecosystem.",
            },
            {
              icon: <FaGlobe className="text-yellow-500 text-4xl mb-3" />,
              title: "Global Coverage",
              text: "Buy credits from diverse sustainability projects — from reforestation to clean energy — around the world.",
            },
            {
              icon: <FaRocket className="text-red-500 text-4xl mb-3" />,
              title: "Offset in Minutes",
              text: "Buy credits and receive certificates instantly. No hidden steps or approval delays.",
            },
            {
              icon: <FaLock className="text-purple-600 text-4xl mb-3" />,
              title: "Secure Payments",
              text: "Complete transactions securely with trusted payment gateways and encryption standards.",
            },
            {
              icon: <FaCheckCircle className="text-emerald-600 text-4xl mb-3" />,
              title: "Impact Transparency",
              text: "See exactly where your money goes — including CO₂ impact per ton and project timelines.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-in-out group"
            >
              <div className="transition transform group-hover:scale-105">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-2 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 px-6 sm:px-12 lg:px-32">
        <p className="text-gray-500 text-sm uppercase tracking-wide mb-5 text-center">
          Our Trusted Climate Partners
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8">
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
