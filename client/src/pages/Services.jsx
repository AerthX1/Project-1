import React from 'react';
import { motion } from 'framer-motion';
import bgImage from '../assets/servicesBg.jpg'; 

const Services = () => {
  const services = [
    {
      title: "Carbon Credit Marketplace",
      description: "Browse and purchase verified carbon credits from global green projects, tailored for businesses and individuals aiming to offset their emissions effectively.",
      features: [
        "Wide selection of verified projects",
        "Flexible subscription & one-time purchase options",
        "Real-time tracking and retirement of credits"
      ],
      buttonText: "Explore Marketplace"
    },
    // {
    //   title: "Blockchain Minting & Verification",
    //   description: "Leverage blockchain to mint unique carbon credit tokens ensuring transparency and fraud prevention.",
    //   features: [
    //     "Immutable ledger of carbon credits",
    //     "Prevents double counting and fraud",
    //     "Easy tracking and auditability"
    //   ],
    //   buttonText: "Learn More"
    // },
    // {
    //   title: "Custom API & Integration",
    //   description: "Integrate AerthX’s carbon platform into your business systems with customizable APIs and enterprise solutions.",
    //   features: [
    //     "API access for high-volume usage",
    //     "Dashboard embedding inside your app",
    //     "Priority onboarding and dedicated support"
    //   ],
    //   buttonText: "Request API Access"
    // },
    {
      title: "ESG Reporting & Analytics",
      description: "Gain deep insights with tailored ESG reports for your offset activities and corporate sustainability goals.",
      features: [
        "Monthly, weekly, or daily reports",
        "Customizable dashboards and analytics",
        "Team collaboration tools included"
      ],
      buttonText: "View Reporting Options"
    },
    {
      title: "Carbon Offset Certificates",
      description: "Receive branded and NFTs to demonstrate your sustainability commitment.",
      features: [
        "Branded certificate design",
        "Shareable digital NFTs",
        "Public offset profile for visibility"
      ],
      buttonText: "Get Certificates"
    },
    {
      title: "Project Onboarding & Minting",
      description: "Green projects can mint credits directly and join a global carbon marketplace.",
      features: [
        "Simple project registration form",
        "Minting fee: ₹5 per credit",
        "Access to buyers and partners"
      ],
      buttonText: "Start Onboarding"
    },
  ];

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex flex-col justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-100 mb-4">
          AerthX Services
        </h1>
        <p className="text-center text-gray-100 mb-10 max-w-3xl leading-relaxed">
          Discover how AerthX empowers businesses, individuals, and projects to take climate action with blockchain-backed carbon credit solutions.
        </p>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 justify-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-90 p-6 rounded-2xl shadow hover:shadow-xl border border-gray-100 hover:scale-105 transition-transform duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-green-700">{service.title}</h3>
                <p className="mb-5 text-gray-700">{service.description}</p>
                <ul className="mb-6 list-disc list-inside text-gray-700 space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <button className="bg-gradient-to-r from-green-600 to-green-500 text-white font-medium py-2.5 rounded-xl hover:from-green-700 hover:to-green-600 transition-colors duration-300">
                {service.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;