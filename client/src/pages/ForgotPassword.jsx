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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-emerald-600">
          Forgot Password
        </h2>

        {message && <p className="text-sm text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-sm text-red-600 text-center mb-4">{error}</p>}

        {step === 1 && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              onClick={sendOtp}
              disabled={loading}
              className={`w-full py-2 rounded-md text-white font-semibold ${
                loading ? "bg-gray-400" : "bg-emerald-500 hover:bg-emerald-600"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
            <input
              type="text"
              placeholder="Enter the OTP sent to your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              onClick={verifyOtp}
              className="w-full py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <button
              onClick={resetPassword}
              className="w-full py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
