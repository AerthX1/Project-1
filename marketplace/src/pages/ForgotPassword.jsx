import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendOtp = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/send-otp`, { email });
      setServerOtp(res.data.otp);
      setStep(2);
      setMessage("OTP has been sent to your email.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = () => {
    setError("");
    setMessage("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp === serverOtp) {
      setStep(3);
      setMessage("OTP verified. You can now reset your password.");
    } else {
      setError("Invalid OTP. Please check again.");
    }
  };

  const resetPassword = async () => {
    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        email,
        password,
      });

      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <button
              onClick={sendOtp}
              disabled={loading}
              className={`w-full mt-6 py-3 rounded-lg text-white font-bold text-lg shadow-md transition duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        );
      case 2:
        return (
          <>
            <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter the OTP from your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <button
              onClick={verifyOtp}
              className="w-full mt-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Verify OTP
            </button>
          </>
        );
      case 3:
        return (
          <>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />

            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />

            <button
              onClick={resetPassword}
              disabled={loading}
              className={`w-full mt-6 py-3 rounded-lg text-white font-bold text-lg shadow-md transition duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              }`}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-blue-600 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Forgot Password?
          </h2>
          <p className="text-sm text-gray-500 mt-2 text-center">
            We'll send you a One-Time Password to reset it.
          </p>
        </div>

        {message && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-6 text-center text-sm font-medium border border-green-200">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-6 text-center text-sm font-medium border border-red-200">
            {error}
          </div>
        )}

        {renderStep()}
      </div>
    </div>
  );
};

export default ForgotPassword; 