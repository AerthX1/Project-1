import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";

const featureGroups = [
  {
    groupTitle: "Dashboard & Reports",
    features: [
      {
        key: "dashboard",
        label: "Dashboard Access",
        tooltip: "Access your personalized dashboard with real-time stats.",
      },
      {
        key: "esgReports",
        label: "ESG Reports Frequency",
        tooltip: "Receive Environmental, Social, and Governance reports.",
      },
      {
        key: "kpiReports",
        label: "Custom KPI Reports",
        tooltip: "Tailored KPI reports for your enterprise needs.",
      },
    ],
  },
  {
    groupTitle: "Carbon Credits",
    features: [
      {
        key: "carbonCredits",
        label: "Carbon Credits Allowed",
        tooltip: "Maximum carbon credits you can offset monthly.",
      },
      {
        key: "blockchain",
        label: "Blockchain Integration",
        tooltip: "Mint and verify credits directly on blockchain.",
      },
    ],
  },
  {
    groupTitle: "Support & Collaboration",
    features: [
      {
        key: "support",
        label: "Support Level",
        tooltip: "Email, priority or dedicated support options.",
      },
      {
        key: "teamTools",
        label: "Team Collaboration Tools",
        tooltip: "Work efficiently with your team inside the platform.",
      },
      {
        key: "dedicatedManager",
        label: "Dedicated Manager",
        tooltip: "Personalized assistance for enterprise clients.",
      },
    ],
  },
  {
    groupTitle: "Extras",
    features: [
      {
        key: "customApi",
        label: "Custom API Access",
        tooltip: "Tailored API for integration and automation.",
      },
      {
        key: "compliance",
        label: "Compliance Advisory",
        tooltip: "Expert advice for environmental regulations.",
      },
    ],
  },
];

const plans = {
  Basic: {
    monthly: 499,
    yearly: 4999,
    features: {
      dashboard: true,
      esgReports: "Monthly",
      kpiReports: false,
      carbonCredits: "Up to 100",
      blockchain: false,
      support: "Email Support",
      teamTools: false,
      dedicatedManager: false,
      customApi: false,
      compliance: false,
    },
    button: "Start Basic",
    highlight: false,
  },
  Pro: {
    monthly: 1999,
    yearly: 19999,
    features: {
      dashboard: true,
      esgReports: "Daily",
      kpiReports: false,
      carbonCredits: "Up to 1,000",
      blockchain: false,
      support: "24h Priority Support",
      teamTools: true,
      dedicatedManager: false,
      customApi: false,
      compliance: false,
    },
    button: "Upgrade to Pro",
    highlight: true,
  },
  Enterprise: {
    monthly: "Custom",
    yearly: "Custom",
    features: {
      dashboard: "Unlimited",
      esgReports: "Custom",
      kpiReports: true,
      carbonCredits: "Unlimited",
      blockchain: true,
      support: "Dedicated Manager",
      teamTools: true,
      dedicatedManager: true,
      customApi: true,
      compliance: true,
    },
    button: "Contact Sales",
    highlight: false,
  },
};

function Tooltip({ text }) {
  return (
    <span
      className="ml-1 text-gray-400 cursor-help group relative inline-block"
      aria-label={text}
      role="tooltip"
    >
      <FaInfoCircle className="inline" />
      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-lg">
        {text}
      </span>
    </span>
  );
}

const ContactSales = ({ onBack }) => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-green-100 to-white py-20 px-6 flex items-center justify-center">
      <div className="max-w-3xl bg-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-extrabold text-green-700 mb-6 text-center drop-shadow-md">
          Contact Our Enterprise Team
        </h2>
        <p className="text-gray-600 text-center mb-10 text-lg leading-relaxed">
          Let’s talk about your carbon goals, API integration, or partnership
          plans. Our team will respond within 1-2 business days.
        </p>

        <form className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="hardik patil"
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-semibold text-gray-700"
              >
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                placeholder="Aearthex Pvt Ltd"
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700"
              >
                Phone (Optional)
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+91 9876543210"
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700"
            >
              What are you looking for?
            </label>
            <textarea
              id="message"
              rows="4"
              placeholder="E.g., API access, large volume credits, branding options..."
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-grow bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Submit Request
            </button>
            <button
              type="button"
              onClick={onBack}
              className="flex-grow border-2 border-green-600 text-green-600 font-bold py-3 rounded-lg shadow-md hover:bg-green-50 transition-transform transform hover:scale-105"
            >
              Back to Plans
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const MostPopularBadge = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      className={`absolute -top-5 right-6 bg-yellow-400 text-green-900 px-5 py-1 rounded-full font-semibold shadow-lg select-none transform transition-transform duration-600 ease-out
      ${
        animate ? "opacity-100 scale-110 animate-pulse" : "opacity-0 scale-75"
      }`}
      aria-label="Most Popular Plan Badge"
    >
      Most Popular
    </div>
  );
};

const Pricing = () => {
  const [billing, setBilling] = useState("monthly");
  const [showContactSales, setShowContactSales] = useState(false);

  const calcSavings = (monthly, yearly) => {
    if (typeof monthly === "number" && typeof yearly === "number") {
      const saved = monthly * 12 - yearly;
      return saved > 0 ? saved : 0;
    }
    return 0;
  };

  if (showContactSales) {
    return <ContactSales onBack={() => setShowContactSales(false)} />;
  }

  return (
    <>
      <section className="bg-gradient-to-b from-green-50 to-white py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold text-green-800 drop-shadow-md mb-3">
            Choose Your Plan
          </h2>
          <p className="text-lg text-green-900 max-w-xl mx-auto leading-relaxed font-medium">
            Transparent pricing tailored for businesses of all sizes.
          </p>

          <div className="inline-flex bg-green-200 rounded-full mt-10 shadow-inner overflow-hidden select-none">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-10 py-3 font-semibold rounded-full transition-transform duration-300 focus:outline-none
                ${
                  billing === "monthly"
                    ? "bg-white text-green-800 shadow-md scale-110"
                    : "text-green-900 hover:text-green-700"
                }`}
              aria-pressed={billing === "monthly"}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-10 py-3 font-semibold rounded-full transition-transform duration-300 focus:outline-none
                ${
                  billing === "yearly"
                    ? "bg-white text-green-800 shadow-md scale-110"
                    : "text-green-900 hover:text-green-700"
                }`}
              aria-pressed={billing === "yearly"}
            >
              Yearly <span className="text-sm font-normal ml-2">(Save 20%)</span>
            </button>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {Object.entries(plans).map(([planName, plan]) => {
            const savings = calcSavings(plan.monthly, plan.yearly);
            return (
              <article
                key={planName}
                className={`relative rounded-3xl p-10 shadow-lg transition-transform transform hover:scale-105 cursor-pointer border-2
                  ${
                    plan.highlight
                      ? "bg-gradient-to-tr from-green-500 via-green-600 to-green-700 text-white border-green-600 shadow-xl"
                      : "bg-white text-gray-800 border-gray-200 hover:shadow-xl"
                  }`}
                aria-label={`${planName} plan`}
              >
                {plan.highlight && <MostPopularBadge />}

                <h3
                  className={`text-3xl font-bold mb-5 tracking-wide ${
                    plan.highlight ? "text-yellow-100 drop-shadow-lg" : "text-green-700"
                  }`}
                >
                  {planName}
                </h3>

                <p
                  className={`text-6xl font-extrabold mb-6 tracking-tight ${
                    plan.highlight ? "text-yellow-200 drop-shadow" : "text-green-800"
                  }`}
                >
                  {plan[billing] === "Custom" ? (
                    "₹Custom"
                  ) : (
                    <>
                      ₹{plan[billing]}{" "}
                      <span className="text-2xl font-semibold text-gray-300/70">
                        /{billing}
                      </span>
                    </>
                  )}
                </p>

                {billing === "yearly" && savings > 0 && (
                  <p
                    className={`mb-8 font-semibold tracking-wide ${
                      plan.highlight ? "text-yellow-300" : "text-green-600"
                    }`}
                    aria-label={`Save ₹${savings} per year`}
                  >
                    Save ₹{savings} per year!
                  </p>
                )}

                {featureGroups.map(({ groupTitle, features }) => (
                  <section key={groupTitle} className="mb-8">
                    <h4
                      className={`text-lg font-semibold mb-3 ${
                        plan.highlight ? "text-yellow-200" : "text-green-700"
                      }`}
                    >
                      {groupTitle}
                    </h4>
                    <ul className="space-y-3">
                      {features.map(({ key, label, tooltip }) => {
                        const value = plan.features[key];
                        let available = false;
                        let display = null;

                        if (typeof value === "boolean") {
                          available = value;
                        } else if (typeof value === "string") {
                          available = true;
                          display = value;
                        }

                        return (
                          <li
                            key={key}
                            className={`flex items-center gap-3 text-sm ${
                              available
                                ? plan.highlight
                                  ? "text-yellow-100"
                                  : "text-gray-900"
                                : plan.highlight
                                ? "text-yellow-300 line-through opacity-80"
                                : "text-gray-400 line-through"
                            }`}
                          >
                            {available ? (
                              <FaCheckCircle
                                className={`flex-shrink-0 ${
                                  plan.highlight
                                    ? "text-yellow-300"
                                    : "text-green-500"
                                }`}
                                size={20}
                                aria-hidden="true"
                              />
                            ) : (
                              <FaTimesCircle
                                className={`flex-shrink-0 ${
                                  plan.highlight
                                    ? "text-yellow-300 opacity-60"
                                    : "text-red-400"
                                }`}
                                size={20}
                                aria-hidden="true"
                              />
                            )}
                            <span className="flex-grow font-normal leading-snug">
                              {label}
                              {tooltip && <Tooltip text={tooltip} />}
                            </span>
                            {display && (
                              <span
                                className={`ml-auto font-semibold ${
                                  plan.highlight ? "text-yellow-200" : "text-gray-700"
                                }`}
                              >
                                {display}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))}

                <button
                  onClick={() => {
                    if (planName === "Enterprise") {
                      setShowContactSales(true);
                    }
                  }}
                  className={`w-full mt-8 py-4 rounded-full font-bold text-lg shadow-lg transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4
                    ${
                      plan.highlight
                        ? "bg-yellow-400 text-green-900 hover:bg-yellow-300 focus:ring-yellow-400"
                        : "bg-green-600 text-white hover:bg-green-700 focus:ring-green-600"
                    } transform hover:scale-105`}
                  aria-label={plan.button}
                >
                  {plan.button}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-24 px-6">
        <h2 className="text-3xl font-extrabold text-green-800 mb-8 tracking-wide drop-shadow-md">
          Certificate & Branding Add-Ons
        </h2>
        <div className="bg-gray-50 rounded-xl p-10 shadow-xl text-gray-700 space-y-6 border border-green-200 hover:shadow-2xl transition-shadow duration-300">
          <p className="text-lg leading-relaxed">
            <strong className="text-green-900">Branded Carbon Offset Certificate NFT:</strong>{" "}
            ₹199 per certificate — A unique, verifiable digital certificate minted on the blockchain.
          </p>
          <p className="text-lg leading-relaxed">
            <strong className="text-green-900">Public Offset Profile for Businesses:</strong>{" "}
            ₹499/month — A public profile showcasing your sustainability milestones.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-24 px-6">
        <h2 className="text-3xl font-extrabold text-green-800 mb-8 tracking-wide drop-shadow-md">
          Minting Fee Structure
        </h2>
        <div className="bg-gradient-to-r from-green-50 to-white rounded-2xl p-10 shadow-2xl text-gray-700 space-y-6 border border-green-200 hover:shadow-3xl transition-shadow duration-300">
          <p className="text-lg leading-relaxed">
            <strong className="text-green-800">Project Onboarding Fee:</strong> ₹5 per carbon credit
          </p>
          <p className="text-lg leading-relaxed">
            <strong className="text-green-800">Blockchain Gas Fees:</strong> Dynamically calculated based on network activity
          </p>
          <p className="text-lg leading-relaxed">
            <strong className="text-green-800">Smart Contract Deployment:</strong> One-time fee based on project complexity
          </p>
          <p className="text-lg leading-relaxed">
            <strong className="text-green-800">Additional Services:</strong> Third-party verifications, reports, consultancy
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-24 px-6 mb-20">
        <h2 className="text-3xl font-extrabold text-green-800 mb-8 tracking-wide drop-shadow-md">
          Custom API & Enterprise Integrations
        </h2>
        <div className="bg-green-50 rounded-xl p-10 shadow-xl text-green-900 space-y-6 border border-green-300 hover:shadow-2xl transition-shadow duration-300">
          <p className="text-lg leading-relaxed">
            Need tailored API endpoints for seamless integration with your systems? Our enterprise plans include:
          </p>
          <ul className="list-disc list-inside space-y-3 font-semibold">
            <li>Custom API key generation & management</li>
            <li>Rate limiting & usage analytics</li>
            <li>Dedicated technical support & onboarding</li>
            <li>Enterprise dashboard with live carbon credit pricing and ESG insights</li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Pricing;
