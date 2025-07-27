import React from 'react';

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
      description: "Receive branded, blockchain-backed carbon certificates and NFTs to demonstrate your sustainability commitment.",
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
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-4">AerthX Services</h1>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Discover how AerthX empowers businesses, individuals, and projects to take climate action with blockchain-backed carbon credit solutions.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-black hover:shadow-lg transition duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-green-700">{service.title}</h3>
              <p className="mb-4 text-gray-600">{service.description}</p>
              <ul className="mb-4 list-disc list-inside text-gray-600 space-y-1">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            <button className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              {service.buttonText}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Services;
