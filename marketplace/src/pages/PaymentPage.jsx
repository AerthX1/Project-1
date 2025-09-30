import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCreditCard, FaPaypal, FaGooglePay, FaCheckCircle, FaLock, FaShieldAlt, FaLeaf, FaTicketAlt, FaPlus, FaMinus, FaChevronDown, FaRegSave, FaInfoCircle } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

const SummaryCard = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
    className={`relative p-6 rounded-2xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-md shadow-xl transition-all duration-300 transform ${className}`}
  >
    {children}
  </motion.div>
);

const formatRupees = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

const PaymentForm = ({ totalPrice }) => {
  const [selectedMethod, setSelectedMethod] = useState("credit_card");
  const [showPromo, setShowPromo] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    promoCode: "",
  });
  const [saveCard, setSaveCard] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    platformFee: 0,
    paymentGatewayFee: 0,
    gst: 0,
    grandTotal: 0,
  });

  const GST_PERCENTAGE = 0.18;

  const paymentFees = {
    credit_card: {
      platformFeePercentage: 0.05,
      gatewayFeePercentage: 0.02,
      gatewayFeeFixed: 25,
      label: "Card",
    },
    paypal: {
      platformFeePercentage: 0.04,
      gatewayFeePercentage: 0.03,
      gatewayFeeFixed: 30,
      label: "PayPal",
    },
    google_pay: {
      platformFeePercentage: 0.03,
      gatewayFeePercentage: 0.01,
      gatewayFeeFixed: 20,
      label: "GPay",
    },
    phonepe: {
      platformFeePercentage: 0.035,
      gatewayFeePercentage: 0.015,
      gatewayFeeFixed: 15,
      label: "PhonePe",
    },
  };

  useEffect(() => {
    const { platformFeePercentage, gatewayFeePercentage, gatewayFeeFixed } = paymentFees[selectedMethod];

    const platformFee = totalPrice * platformFeePercentage;
    const paymentGatewayFee = (totalPrice * gatewayFeePercentage) + gatewayFeeFixed;
    const baseForTax = totalPrice + platformFee + paymentGatewayFee;
    const gst = baseForTax * GST_PERCENTAGE;
    const grandTotal = totalPrice + platformFee + paymentGatewayFee + gst;

    setPaymentDetails({ platformFee, paymentGatewayFee, gst, grandTotal });

  }, [selectedMethod, totalPrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (selectedMethod === "credit_card" && (!formData.cardNumber || !formData.expiryDate || !formData.cvc)) {
      alert("Please fill in all card details.");
      return;
    }
    
    console.log("Submitting payment with data:", { ...formData, grandTotal: paymentDetails.grandTotal, selectedMethod, saveCard });
    alert(`Processing payment of ${formatRupees(paymentDetails.grandTotal)}.`);
  };

  const applyPromoCode = () => {
    if (formData.promoCode.toLowerCase() === "eco20") {
      alert("Promo codes are currently disabled for this page.");
    } else {
      alert("Invalid promo code.");
    }
  };

  const renderInput = (name, label, type = "text", required = false, pattern = null, inputMode = null) => (
    <div className="relative z-0 w-full mb-6 group">
      <input
        type={type}
        name={name}
        id={name}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
        placeholder=" "
        required={required}
        value={formData[name]}
        onChange={handleInputChange}
        pattern={pattern}
        inputMode={inputMode}
        aria-label={label}
      />
      <label
        htmlFor={name}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );

  const { platformFee, paymentGatewayFee, gst, grandTotal } = paymentDetails;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 lg:p-12 rounded-3xl shadow-2xl w-full max-w-lg mx-auto"
    >
      <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Payment Details</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { id: "credit_card", icon: FaCreditCard, label: "Card" },
          { id: "paypal", icon: FaPaypal, label: "PayPal" },
          { id: "google_pay", icon: FaGooglePay, label: "GPay" },
          { id: "phonepe", icon: SiPhonepe, label: "PhonePe" },
        ].map((method) => (
          <motion.button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center justify-center py-4 px-2 rounded-xl border-2 transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-green-500
            ${selectedMethod === method.id ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg" : "border-gray-300 text-gray-600 hover:border-green-400"}`}
            aria-pressed={selectedMethod === method.id}
          >
            <method.icon size={28} className="mb-2" />
            <span className="text-sm font-semibold">{method.label}</span>
            <AnimatePresence>
              {selectedMethod === method.id && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1"
                >
                  <FaCheckCircle className="text-green-500" size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <form onSubmit={handlePaymentSubmit}>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-full">{renderInput("fullName", "Full Name", "text", true)}</div>
          <div className="w-full">{renderInput("email", "Email Address", "email", true)}</div>
        </div>
        {renderInput("companyName", "Company Name (Optional)")}

        <AnimatePresence mode="wait">
          {selectedMethod === "credit_card" && (
            <motion.div
              key="card-fields"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {renderInput("cardNumber", "Card Number", "text", true, "[0-9]{13,19}", "numeric")}
              <div className="flex space-x-4">
                <div className="w-1/2">{renderInput("expiryDate", "Expiry (MM/YY)", "text", true, "(0[1-9]|1[0-2])\\/[0-9]{2}", "numeric")}</div>
                <div className="w-1/2">{renderInput("cvc", "CVC", "text", true, "[0-9]{3,4}", "numeric")}</div>
              </div>
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="saveCard"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-900">
                  <FaRegSave className="inline-block mr-1 text-gray-500" /> Save this card for future purchases
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowPromo(!showPromo)}
            className="flex items-center text-sm text-green-600 font-semibold hover:underline transition-colors focus:outline-none"
            aria-expanded={showPromo}
          >
            <FaTicketAlt className="mr-2" />
            Have a promo code?
            <motion.div
              animate={{ rotate: showPromo ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown className="ml-2" />
            </motion.div>
          </button>
          <AnimatePresence>
            {showPromo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-2 flex space-x-2"
              >
                <input
                  type="text"
                  name="promoCode"
                  placeholder="Enter code"
                  value={formData.promoCode}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={applyPromoCode}
                  className="py-3 px-6 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Apply
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          key={totalPrice} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 p-6 rounded-2xl shadow-inner space-y-4"
        >
          <div className="flex justify-between items-center text-base">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-bold text-gray-900">{formatRupees(totalPrice)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Platform Fee ({paymentFees[selectedMethod].platformFeePercentage * 100}%):</span>
            <span className="font-bold text-gray-900">{formatRupees(platformFee)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Payment Gateway Fee ({paymentFees[selectedMethod].gatewayFeePercentage * 100}% + {formatRupees(paymentFees[selectedMethod].gatewayFeeFixed)}):</span>
            <span className="font-bold text-gray-900">{formatRupees(paymentGatewayFee)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">GST ({GST_PERCENTAGE * 100}%):</span>
            <span className="font-bold text-gray-900">{formatRupees(gst)}</span>
          </div>
          <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white p-4 rounded-xl shadow-lg"
            >
              <div className="flex justify-between items-center">
                <span className="text-xl lg:text-2xl font-bold text-green-600">Grand Total:</span>
                <span className="text-2xl lg:text-3xl font-extrabold text-green-600">{formatRupees(grandTotal)}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 px-4 rounded-lg font-bold text-lg text-white transition-all duration-300 transform shadow-lg mt-8
          bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
        >
          Pay {formatRupees(grandTotal)}
        </motion.button>

        <div className="flex justify-center space-x-6 mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-col items-center space-y-1 text-gray-500 text-xs">
            <FaLock size={20} />
            <span>SSL Secured</span>
          </div>
          <div className="flex flex-col items-center space-y-1 text-gray-500 text-xs">
            <FaShieldAlt size={20} />
            <span>PCI Compliant</span>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

const PaymentPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tons, setTons] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${API}/carbon-credits`);
        const found = res.data.find((p) => p._id === id);
        if (found) {
          const CONVERSION_RATE_USD_TO_INR = 83.5;
          setProject({
            ...found,
            pricePerTon: found.pricePerTon * CONVERSION_RATE_USD_TO_INR,
          });
        } else {
            setError("Project not found.");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, API]);

  const handleTonsChange = (newTons) => {
    setTons(Math.max(1, newTons));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-700 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }
  
  const totalPrice = project.pricePerTon * tons;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 lg:p-12">
      <div className="flex flex-col lg:flex-row max-w-7xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div
          className="lg:w-1/2 p-8 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden"
          style={{ backgroundImage: "linear-gradient(135deg, #16a085 0%, #064E3B 100%)", backgroundSize: "cover" }}
        >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34.63l2.29-1.32-.82-1.42L36 31.79l-1.47-2.55-2.29 1.32.82 1.42L36 34.63zm.74-7.23a1.5 1.5 0 1 1-1.48-2.61l1.48-2.56L38.25 25l-2.73 1.58zM42 34.63l-1.47-2.55-2.29 1.32.82 1.42L42 34.63zm-.74-7.23a1.5 1.5 0 1 1-1.48-2.61L39.52 25l2.73 1.58zM30 36.63l-2.29-1.32.82-1.42L30 33.79l1.47-2.55 2.29 1.32-.82 1.42L30 36.63zM29.26 29.4a1.5 1.5 0 1 1 1.48-2.61L29.26 25l-2.73 1.58z\" fill=\"%23FFF\"/%3E%3Cpath d=\"M24 36.63l-2.29-1.32.82-1.42L24 33.79l1.47-2.55 2.29 1.32-.82 1.42L24 36.63zm.74-7.23a1.5 1.5 0 1 1 1.48-2.61L25.26 25l-2.73 1.58z\" fill=\"%23FFF\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}} />
          <div className="absolute inset-0 bg-black opacity-30"></div>

          <div className="relative z-10 flex flex-col h-full">
            <div>
              <h2 className="text-5xl font-extrabold leading-tight mb-4 tracking-tight">
                Your Contribution
              </h2>
              <p className="text-gray-200 text-lg mb-8 opacity-90">
                Offset your footprint with a verified project and help create a sustainable future.
              </p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="space-y-6">
                <SummaryCard>
                  <span className="block text-sm font-semibold text-green-300">Project Title</span>
                  <span className="block text-2xl font-bold mt-1 text-black">{project ? project.title : "N/A"}</span>
                </SummaryCard>
                <SummaryCard>
                  <span className="block text-sm font-semibold text-green-300">Price per Ton</span>
                  <span className="block text-2xl font-bold mt-1 text-black">{project ? formatRupees(project.pricePerTon) : "N/A"}</span>
                </SummaryCard>
        <SummaryCard className="!bg-white !bg-opacity-100 !backdrop-blur-none !shadow-none">
  <label htmlFor="tons-input" className="block text-sm font-semibold text-gray-700 mb-2">
    Number of Tons
  </label>
  <div className="flex items-center space-x-3">
    <button
      onClick={() => handleTonsChange(tons - 1)}
      className="p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
      aria-label="Decrease tons"
    >
      <FaMinus />
    </button>
    <input
      id="tons-input"
      type="number"
      min="1"
      value={tons}
      onChange={(e) => handleTonsChange(parseInt(e.target.value) || 0)}
      className="w-full p-2 text-gray-800 text-center border-b border-gray-300 focus:outline-none focus:border-green-500 text-lg font-bold"
      aria-label="Number of tons"
    />
    <button
      onClick={() => handleTonsChange(tons + 1)}
      className="p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
      aria-label="Increase tons"
    >
      <FaPlus />
    </button>
  </div>
</SummaryCard>
              </motion.div>
            </div>

            <motion.div
              key={totalPrice}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 mt-10 border-t border-gray-700 pt-6"
            >
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-green-400">Subtotal</span>
                <span className="text-5xl font-extrabold text-white">{formatRupees(totalPrice)}</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center bg-gray-50">
          <PaymentForm totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;