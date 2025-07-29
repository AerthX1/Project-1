import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtpAction } from "../../../shared-redux/src/slices/authSlice";
import axios from "axios";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user, token } = useSelector((state) => state.auth); 

  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const { form, userType } = location.state || {};

  useEffect(() => {
    if (!form || !userType) {
      navigate("/register");
      alert("Please complete the registration form first.");
    }
  }, [form, userType, navigate]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

 const handleVerify = async (e) => {
  e.preventDefault();
  setVerificationMessage("");

  if (!otp) {
    setVerificationMessage("Please enter the OTP.");
    return;
  }

  try {
    const resultAction = await dispatch(
      verifyOtpAction({ email: form.email, otp, form, userType })
    );

    if (verifyOtpAction.fulfilled.match(resultAction)) {
      setVerificationMessage("OTP verified successfully! Registration complete.");
      navigate("/");
    } else {
      setVerificationMessage(resultAction.payload || "OTP verification failed.");
    }
  } catch (err) {
    setVerificationMessage("Something went wrong. Try again.");
  }
};


  const handleResendOtp = async () => {
    setCanResend(false);
    setResendTimer(60); 
    setVerificationMessage("");

    try {
      const email = form?.email;
      const res = await axios.post(`${API_URL}/auth/send-otp`, { email });
      setVerificationMessage(res.data.message || "New OTP sent!");
    } catch (err) {
      console.error("Resend OTP API error:", err);
      setVerificationMessage(err.response?.data?.message || "Failed to resend OTP.");
      setCanResend(true); 
    }
  };

  if (!form || !userType) {
    return <div className="text-center mt-20">Loading registration data...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      <p className="text-gray-600 mb-4">
        An OTP has been sent to **{form.email}**. Please enter it below to complete your registration.
      </p>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          name="otp"
          value={otp}
          onChange={handleOtpChange}
          placeholder="Enter 6-digit OTP"
          className="w-full p-3 border rounded-md mb-4 text-center text-lg tracking-wider"
          maxLength="6"
          required
        />
        {verificationMessage && (
          <p className={`text-center mb-4 ${verificationMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {verificationMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <div className="mt-6 text-center">
        {canResend ? (
          <button
            onClick={handleResendOtp}
            className="text-green-600 hover:underline disabled:text-gray-400 disabled:no-underline"
            disabled={loading}
          >
            Resend OTP
          </button>
        ) : (
          <p className="text-gray-500">Resend OTP in {resendTimer}s</p>
        )}
      </div>

      <p className="mt-4 text-center text-sm text-gray-500">
        Did not receive the email? Check your spam folder.
      </p>
    </div>
  );
};

export default VerifyOtp;