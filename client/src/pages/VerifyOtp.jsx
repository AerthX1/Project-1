import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtpAction, setUser, setToken, setUserType } from "../../../shared-redux/src/slices/authSlice";
import { fetchProfile } from "../../../shared-redux/src/slices/profileSlice";
import axios from "axios";
import { XCircleIcon, CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/20/solid";


const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState({ type: "", text: "" });
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const { form, userType } = location.state || {};

  useEffect(() => {
    if (!form || !userType) {
      navigate("/register", { replace: true });
      setVerificationMessage({ type: "error", text: "Please complete the registration form first." });
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

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);

    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
    if (!value && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split('');
    setOtp(newOtp.concat(new Array(6 - newOtp.length).fill("")));
    if (inputRefs.current[newOtp.length - 1]) {
      inputRefs.current[newOtp.length - 1].focus();
    } else if (inputRefs.current[5]) {
      inputRefs.current[5].focus();
    }
  };

 const handleVerify = async (e) => {
  e.preventDefault();
  setVerificationMessage({ type: "", text: "" });

  const enteredOtp = otp.join("");
  if (enteredOtp.length !== 6) {
    setVerificationMessage({ type: "error", text: "Please enter the complete 6-digit OTP." });
    return;
  }

  try {
    const resultAction = await dispatch(
      verifyOtpAction({ email: form.email, otp: enteredOtp, form, userType })
    );

  if (verifyOtpAction.fulfilled.match(resultAction)) {
  const { token, user } = resultAction.payload;

  const normalizedUserType = userType.toLowerCase();

  dispatch(setUser(user));
  dispatch(setToken(token));              
  dispatch(setUserType(normalizedUserType));         

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("userType", normalizedUserType);

  await dispatch(fetchProfile({ token, userType: normalizedUserType }));

  setVerificationMessage({ type: "success", text: "OTP verified successfully! Redirecting..." });

  setTimeout(() => {  
    navigate("/", { replace: true }); 
  }, 1500);
}
 else {
      setVerificationMessage({ type: "error", text: resultAction.payload || "OTP verification failed. Please try again." });
    }
  } catch (err) {
    console.error("OTP verification error:", err);
    setVerificationMessage({ type: "error", text: "An unexpected error occurred. Please try again later." });
  }
};


  const handleResendOtp = async () => {
    setIsResending(true);
    setCanResend(false);
    setResendTimer(60);
    setVerificationMessage({ type: "info", text: "Requesting new OTP..." });

    try {
      const email = form?.email;
      const res = await axios.post(`${API_URL}/auth/send-register-otp`, { email });
      setVerificationMessage({ type: "success", text: res.data.message || "New OTP sent! Check your inbox." });
    } catch (err) {
      console.error("Resend OTP API error:", err);
      setVerificationMessage({ type: "error", text: err.response?.data?.message || "Failed to resend OTP. Please try again." });
      setCanResend(true);
    } finally {
      setIsResending(false);
    }
  };

  if (!form || !userType) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-xl text-center">
          <p className="text-xl font-semibold text-gray-700">Loading registration data...</p>
          <p className="text-gray-500 mt-2">If you're not redirected, please return to the registration page.</p>
        </div>
      </div>
    );
  }

  const getMessageIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />;
      case "error":
        return <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />;
      case "info":
        return <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email Address
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            A 6-digit verification code has been sent to
            <strong className="font-medium text-indigo-600"> {form.email}</strong>.
            Please enter the code below to complete your registration.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleVerify}>
          <div className="flex justify-center space-x-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-2xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                required
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>

          {verificationMessage.text && (
            <div
              className={`flex items-center justify-center p-3 rounded-md text-sm transition-all duration-300 ease-in-out
                ${verificationMessage.type === "success" ? "bg-green-100 text-green-800" :
                verificationMessage.type === "error" ? "bg-red-100 text-red-800" :
                  "bg-blue-100 text-blue-800"
              }`}
              role="alert"
            >
              {getMessageIcon(verificationMessage.type)}
              <p>{verificationMessage.text}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || otp.join("").length !== 6}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white
              ${loading || otp.join("").length !== 6
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              } transition duration-150 ease-in-out`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          {canResend ? (
            <button
              onClick={handleResendOtp}
              disabled={isResending}
              className={`font-medium text-indigo-600 hover:text-indigo-500
                ${isResending ? "cursor-not-allowed opacity-75" : ""} transition duration-150 ease-in-out`}
            >
              {isResending ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Resend OTP"
              )}
            </button>
          ) : (
            <p className="text-sm text-gray-500">Resend OTP in <strong className="font-semibold text-indigo-600">{resendTimer}s</strong></p>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          Did not receive the email? Please check your spam or junk folder. If you still don't receive it, ensure your email address is correct or try resending.
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;