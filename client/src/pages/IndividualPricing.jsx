import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const BASE_PRICE_INR = 1500; 
const CREDIT_PRICE_PER_TON_INR = 200; 

const SUBSCRIPTION_TERMS = [
  { id: "monthly", name: "Monthly", discount: 0, label: "Pay every month", priceMultiplier: 1 },
  { id: "quarterly", name: "Quarterly", discount: 5, label: "Save 5% (Billed ₹{PRICE_PER_PERIOD})", priceMultiplier: 0.95 },
  { id: "yearly", name: "Yearly", discount: 15, label: "Save 15% (Billed ₹{PRICE_PER_PERIOD})", priceMultiplier: 0.85 },
];

const PERKS = [
  { id: "annual_cert", name: "Annual Certificate", icon: "📄", price: 500, description: "Official yearly certification of your massive offset." },
  { id: "csr_report", name: "Impact/CSR Report", icon: "📰", price: 800, description: "Detailed report ready for corporate social responsibility use." },
  { id: "dashboard", name: "Standard Dashboard", icon: "🖥️", price: 300, description: "Basic access to your offset data and contributions." },
  { id: "notifications", name: "Credit Notifications", icon: "🔔", price: 100, description: "Alerts for carbon credit lifecycle and market updates." },
  { id: "advanced_analytics", name: "Advanced Analytics", icon: "📈", price: 1500, description: "Deep dive into offset data, trends, and future projections." },
  { id: "esg_reports", name: "Quarterly ESG Reports", icon: "📊", price: 2500, description: "Access to Environmental, Social, and Governance compliance data." },
  { id: "digital_badge", name: "Digital Badge", icon: "🏅", price: 150, description: "Showcase your Advocate status on social media/websites." },
  { id: "sdg_reports", name: "SDG Alignment Reports", icon: "🎯", price: 1800, description: "Reports showing alignment with UN Sustainable Development Goals." },
  { id: "brsr", name: "BRSR Framework Access", icon: "📝", price: 3000, description: "Business Responsibility and Sustainability Reporting (BRSR) data." },
  { id: "limited_credits", name: "Research Credits Access", icon: "🧪", price: 2000, description: "Access to limited-run, high-impact research carbon credits." },
  { id: "download_cert", name: "Downloadable Certificate", icon: "📥", price: 200, description: "Instantly download monthly proof of your contribution." },
];

const GAMIFICATION_LEVELS = [
  { minProgress: 0, name: "New Seed", emoji: "🌱", color: 'text-green-500' },
  { minProgress: 25, name: "Eco Contributor", emoji: "🌿", color: 'text-green-600' },
  { minProgress: 50, name: "Carbon Advocate", emoji: "⭐", color: 'text-blue-500' },
  { minProgress: 75, name: "Planet Guardian", emoji: "🌍", color: 'text-indigo-500' },
];


const calculateImpact = (tons) => ({
  trees: Math.round(tons * 50),
  carMiles: Math.round(tons * 2500 * 1.609),
});

const formatINR = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const IndividualPricing = () => {
  const [step, setStep] = useState(1);
  const [creditsTons, setCreditsTons] = useState(5); 
  const [selectedPerks, setSelectedPerks] = useState({});
  const [selectedTermId, setSelectedTermId] = useState(SUBSCRIPTION_TERMS[0].id);
  
const navigate = useNavigate();

  const selectedTerm = useMemo(() => 
    SUBSCRIPTION_TERMS.find(term => term.id === selectedTermId) || SUBSCRIPTION_TERMS[0], 
    [selectedTermId]
  );


  const calculateMonthlyCost = useMemo(() => {
    const creditsCost = creditsTons * CREDIT_PRICE_PER_TON_INR;
    const perksCost = PERKS.reduce((sum, perk) => {
      return selectedPerks[perk.id] ? sum + perk.price : sum;
    }, 0);
    return BASE_PRICE_INR + creditsCost + perksCost;
  }, [creditsTons, selectedPerks]);

  const calculateTotalCost = useMemo(() => {
    const monthlyCost = calculateMonthlyCost;
    const termMultiplier = selectedTerm.priceMultiplier;
    
    let totalCost = monthlyCost * termMultiplier;

    if (selectedTerm.id === 'yearly') {
      totalCost *= 12;
    } else if (selectedTerm.id === 'quarterly') {
      totalCost *= 3;
    }

    return Math.round(totalCost);
  }, [calculateMonthlyCost, selectedTerm]);

  const displayCostPerPeriod = useMemo(() => {
    const price = formatINR(calculateTotalCost);
    if (selectedTerm.id === 'yearly') return `Yearly: ${price}`;
    if (selectedTerm.id === 'quarterly') return `Quarterly: ${price}`;
    return `Monthly: ${price}`;
  }, [calculateTotalCost, selectedTerm]);

  const totalImpact = useMemo(() => calculateImpact(creditsTons), [creditsTons]);

  const calculateProgress = useMemo(() => {
    const maxProgress = 40 + 30 + 30;
    let currentProgress = 0;

    currentProgress += Math.min(creditsTons * 0.4, 40); 

    currentProgress += Object.keys(selectedPerks).filter(key => selectedPerks[key]).length * (30 / PERKS.length); 

    if (selectedTerm.id === 'yearly') currentProgress += 30;
    else if (selectedTerm.id === 'quarterly') currentProgress += 15;

    return Math.min(Math.round((currentProgress / maxProgress) * 100), 100);
  }, [creditsTons, selectedPerks, selectedTerm.id]);

  const progressLevel = useMemo(() => {
    return GAMIFICATION_LEVELS.slice().reverse().find(level => calculateProgress >= level.minProgress);
  }, [calculateProgress]);

  const handlePerkToggle = (id) => {
    setSelectedPerks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNextStep = () => {
    if (step < 6) setStep(step + 1);
  };
  
  const handleBackStep = () => {
    if (step > 1) setStep(step - 1);
  };

    const handleSubscribe = () => {
    navigate("/PricingGateway");
  };

  const StepIndicator = ({ number, title }) => (
    <div className={`flex flex-col items-center space-y-1 ${step >= number ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
      <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300
        ${step >= number ? 'border-green-500 bg-green-100 shadow-lg' : 'border-gray-300 bg-white'}`}>
        {number}
      </div>
      <span className="text-xs sm:text-sm text-center hidden sm:inline">{title}</span>
    </div>
  );

  const PerkToggleCard = ({ id, name, description, icon, isChecked, onToggle }) => (
    <div
      onClick={() => onToggle(id)}
      className={`p-4 flex items-start space-x-4 rounded-xl cursor-pointer transition-all duration-300 border-2
        ${isChecked
          ? "bg-green-50/70 border-green-500 shadow-lg transform scale-[1.01]"
          : "bg-white/90 border-gray-100 hover:bg-green-50/50 hover:shadow-md"
        } backdrop-blur-sm`} 
    >
      <div className="flex-shrink-0 text-3xl mt-1">{icon}</div>
      <div className="flex-grow">
        <h4 className="text-lg font-bold text-gray-800 flex justify-between">
            {name}
            {isChecked && <span className="text-sm text-green-600 font-extrabold mt-1">✓ ADDED</span>}
        </h4>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <input
        type="checkbox"
        checked={isChecked}
        readOnly
        className="h-5 w-5 text-green-600 rounded focus:ring-green-500 mt-1 flex-shrink-0"
      />
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl">
            <h2 className="text-4xl font-extrabold text-green-800 mb-4">Welcome to Your Green Journey 🌏</h2>
            <p className="text-xl text-gray-700 mb-6">
              Customize your **AerthX** carbon offset plan and take a powerful step towards a net-zero future. Every action matters.
            </p>
            <div className="text-7xl mb-8">
              🌳  🌊
            </div>
            <p className="text-lg font-semibold text-green-600">
              Your customized plan supports verified projects across Forests, Oceans, Renewable Energy, and Wildlife Conservation.
            </p>
          </div>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold text-green-800 mb-6">Step 2: Define Your Monthly CO₂ Offset</h2>
            <div className="p-6 bg-white/90 rounded-xl shadow-lg border border-green-100 backdrop-blur-sm">
              <label htmlFor="credits-slider" className="block text-xl font-extrabold text-green-700 mb-4">
                Monthly CO₂ Offset: <span className="text-3xl font-black text-green-900">{creditsTons} tons</span>
              </label>
              <input
                type="range"
                id="credits-slider"
                min="0"
                max="100"
                step="1"
                value={creditsTons}
                onChange={(e) => setCreditsTons(parseInt(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-green-300 via-green-500 to-blue-500 rounded-full appearance-none cursor-pointer accent-green-600 transition-colors duration-300"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>0 tons</span>
                <span className="font-semibold text-green-700">Cost: +{ formatINR(creditsTons * CREDIT_PRICE_PER_TON_INR) }/mo</span>
                <span>100 tons (Max Impact)</span>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 space-y-3">
                <h3 className="text-xl font-bold text-gray-800">Your Equivalent Impact in India 🇮🇳</h3>
                <p className="text-lg font-medium text-gray-700 flex items-center space-x-2">
                    <span className="text-2xl">🌲</span>
                    <span>Approx. <span className="font-extrabold text-green-600">{totalImpact.trees.toLocaleString()}</span> trees planted annually.</span>
                </p>
                <p className="text-lg font-medium text-gray-700 flex items-center space-x-2">
                    <span className="text-2xl">🚗</span>
                    <span>Equivalent to taking a car off the road for <span className="font-extrabold text-green-600">{totalImpact.carMiles.toLocaleString()}</span> km.</span>
                </p>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold text-green-800 mb-6">Step 3: Select Your Premium Features and Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PERKS.map((perk) => (
                <PerkToggleCard
                  key={perk.id}
                  id={perk.id}
                  name={perk.name}
                  description={perk.description}
                  icon={perk.icon}
                  isChecked={selectedPerks[perk.id] || false}
                  onToggle={handlePerkToggle}
                />
              ))}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-2xl font-bold text-green-800 mb-6">Step 4: Choose Your Billing Cycle 🗓️</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SUBSCRIPTION_TERMS.map((term) => {
                const effectiveMonthlyPrice = calculateMonthlyCost * term.priceMultiplier;
                const pricePerPeriod = term.id === 'monthly' 
                    ? effectiveMonthlyPrice 
                    : term.id === 'quarterly' 
                    ? effectiveMonthlyPrice * 3 
                    : effectiveMonthlyPrice * 12;

                const termLabel = term.label.replace('{PRICE_PER_PERIOD}', formatINR(Math.round(pricePerPeriod)));

                return (
                  <div
                    key={term.id}
                    onClick={() => setSelectedTermId(term.id)}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-4
                      ${selectedTerm.id === term.id
                        ? "bg-blue-50/70 border-blue-500 shadow-xl transform scale-[1.05] ring-4 ring-blue-200"
                        : "bg-white/90 border-gray-100 hover:bg-blue-50/50 hover:shadow-md"
                      } backdrop-blur-sm`}
                  >
                    <h3 className="text-2xl font-extrabold text-gray-800 mb-1">{term.name}</h3>
                    <p className="text-sm font-semibold text-blue-600 mb-4">{termLabel}</p>
                    
                    <div className="text-4xl font-black text-green-700">
                      {formatINR(Math.round(effectiveMonthlyPrice))}
                      <span className="text-lg font-medium text-gray-500">/mo</span>
                    </div>

                    {term.discount > 0 && (
                      <p className="mt-3 text-sm text-green-600 font-bold bg-green-100 inline-block px-3 py-1 rounded-full">
                          🔥 Save {term.discount}%
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2 className="text-2xl font-bold text-green-800 mb-6">Step 5: Review & Confirm Your Custom Plan</h2>
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-green-200">
              <h3 className="text-xl font-extrabold text-green-700 mb-4 border-b pb-2">Subscription Details</h3>

              <div className="space-y-4">
    
                <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
                  <span className="text-xl font-medium text-gray-600">Total Price ({selectedTerm.name} Billing):</span>
                  <span className="text-4xl font-extrabold text-green-800">{formatINR(calculateTotalCost)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-600">Monthly Equivalent:</span>
                  <span className="text-xl font-bold text-gray-700">{formatINR(calculateMonthlyCost)} / mo</span>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Plan Contents:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li className="font-medium text-green-600 flex items-center space-x-1">
                        <span className="text-xl">🌎</span>
                        <span>Base Offset: All Causes Supported</span>
                    </li>
                    <li className="font-medium flex items-center space-x-1">
                        <span className="text-xl">🌲</span>
                        <span>Carbon Offset: <span className="font-extrabold text-green-700">{creditsTons} tons CO₂</span> monthly</span>
                    </li>
                    {PERKS.filter(p => selectedPerks[p.id]).map(p => (
                      <li key={p.id} className="text-base flex items-center space-x-1">
                          <span className="text-xl">{p.icon}</span>
                          <span>{p.name} <span className="text-sm text-gray-400"> (Feature Added)</span></span>
                      </li>
                    ))}
                    {Object.keys(selectedPerks).filter(key => selectedPerks[key]).length === 0 && (
                      <li className="text-sm italic text-gray-400">No extra perks selected.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </>
        );
      case 6:
        return (
          <>
            <h2 className="text-2xl font-bold text-green-800 mb-6">Step 6: Confirm & Start Your Green Journey</h2>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-3xl shadow-2xl border-4 border-green-300 text-center space-y-8">
              <p className="text-2xl text-gray-700 font-semibold">
                Congratulations! You are officially a <span className="font-black text-green-800 whitespace-nowrap">{progressLevel.name} {progressLevel.emoji}</span>, making a real difference.
              </p>
              <div className="flex flex-col items-center">
                  <p className="text-xl font-medium text-gray-600">Final Billed Amount:</p>
                  <p className="text-6xl font-black text-green-800">
                    {formatINR(calculateTotalCost)}
                  </p>
                  <p className="text-xl font-extrabold text-blue-600 mt-2">Billed {selectedTerm.name}</p>
              </div>

              <button
                onClick={handleSubscribe}
                className="w-full max-w-sm py-4 text-2xl font-extrabold text-white bg-green-600 rounded-full shadow-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-70"
              >
                Start My Green Journey 🌍
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Secure payment via UPI/Cards/Netbanking. You can manage or cancel your plan anytime.
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-green-900 mb-8 text-center lg:text-left">
          AerthX Custom Plan Builder (₹)
        </h1>

        <div className="flex justify-between items-start sm:items-center mb-10 p-4 bg-white rounded-2xl shadow-xl">
          <StepIndicator number={1} title="Welcome" />
          <div className={`flex-1 h-1 mx-2 mt-4 sm:mt-0 ${step >= 2 ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-300'} transition-all duration-500`}></div>
          <StepIndicator number={2} title="CO₂ Offset" />
          <div className={`flex-1 h-1 mx-2 mt-4 sm:mt-0 ${step >= 3 ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-300'} transition-all duration-500`}></div>
          <StepIndicator number={3} title="Features" />
          <div className={`flex-1 h-1 mx-2 mt-4 sm:mt-0 ${step >= 4 ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-300'} transition-all duration-500`}></div>
          <StepIndicator number={4} title="Term" />
          <div className={`flex-1 h-1 mx-2 mt-4 sm:mt-0 ${step >= 5 ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-300'} transition-all duration-500`}></div>
          <StepIndicator number={5} title="Review" />
          <div className={`flex-1 h-1 mx-2 mt-4 sm:mt-0 ${step >= 6 ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-300'} transition-all duration-500`}></div>
          <StepIndicator number={6} title="Confirm" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-2xl border border-green-100 min-h-[600px]">
            {renderStepContent()}

            <div className={`flex mt-8 pt-6 border-t ${step > 1 && step < 6 ? 'justify-between' : step === 6 ? 'justify-start' : 'justify-end'}`}>
              {step > 1 && (
                <button
                  onClick={handleBackStep}
                  className="px-6 py-3 text-green-700 border-2 border-green-300 rounded-full hover:bg-green-50 transition-colors font-semibold"
                >
                  ← Back
                </button>
              )}
              {step < 6 && (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 text-white bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors font-semibold"
                >
                  {step === 5 ? 'Confirm & Go to Payment' : 'Next Step →'}
                </button>
              )}
            </div>
          </div>
        
          <div className="lg:col-span-1 sticky top-8 h-fit">
            <div className="bg-gradient-to-b from-green-50 to-white p-6 rounded-3xl shadow-2xl border-4 border-green-200">
              <h3 className="text-2xl font-extrabold text-green-800 mb-4 border-b pb-2">
                Live Plan Summary
              </h3>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between items-end border-b pb-2">
                  <span className="text-xl font-extrabold text-gray-700">Total Price:</span>
                  <span className="text-3xl font-black text-green-700">{displayCostPerPeriod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700">Monthly CO₂ Offset:</span>
                  <span className="text-xl font-bold text-green-700">{creditsTons} tons</span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-white rounded-xl border border-green-100 shadow-inner">
                <h4 className="font-bold text-green-700 mb-2 border-b pb-1">Selected Features:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li className="font-medium text-green-600">
                    <span className="font-extrabold text-base">BASE PLAN:</span> {formatINR(BASE_PRICE_INR)}/mo
                  </li>
                  <li className="font-medium">
                    Credits: {creditsTons} tons (+{formatINR(creditsTons * CREDIT_PRICE_PER_TON_INR)}/mo)
                  </li>
                  <li className="font-medium text-blue-600">
                    Billing Term: {selectedTerm.name} ({selectedTerm.discount}% off monthly rate)
                  </li>
                  {PERKS.filter(p => selectedPerks[p.id]).map(p => (
                    <li key={p.id}>{p.name} (Feature Added)</li>
                  ))}
                  {Object.keys(selectedPerks).filter(key => selectedPerks[key]).length === 0 && (
                    <li className="italic text-gray-400">No extra perks selected.</li>
                  )}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-green-200">
                <div className="flex justify-between mb-2 text-base font-bold text-green-700">
                  <span>Advocate Level Progress</span>
                  <span>{calculateProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-green-500 to-blue-500"
                    style={{ width: `${calculateProgress}%` }}
                  ></div>
                </div>
                <p className="mt-3 text-center text-lg font-extrabold text-green-800">
                  Current Status: <span className={`whitespace-nowrap ${progressLevel.color}`}>{progressLevel.name} {progressLevel.emoji}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualPricing;