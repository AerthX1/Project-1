import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerOrganization, setUser } from "../../../shared-redux/src/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [emailError, setEmailError] = useState("");
const [emailChecking, setEmailChecking] = useState(false);
const emailTimerRef = useRef(null);
const API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    orgName: "",
    orgType: "",
    industry: "",
    website: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    fullName: "",
    email: "",
    password: "",
    designation: "",
    employeeCount: "",
    termsAgreed: false,
  });

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setForm({ ...form, [name]: type === "checkbox" ? checked : value });

if (name === "email") {
  setEmailChecking(true);
  setEmailError("");

  if (emailTimerRef.current) clearTimeout(emailTimerRef.current);

  emailTimerRef.current = setTimeout(async () => {
    if (!value.includes("@") || value.length < 6) {
      setEmailError("Invalid email format");
      setEmailChecking(false);
      return;
    }
  setEmailError("");
  setEmailChecking(false);
 
  }, 500);
}

};


const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Register form submitted");
  console.log("API_URL is:", API_URL);

  if (!form.termsAgreed) return alert("Please agree to Terms & Conditions");
  if (emailError || emailChecking) return;

try {
  console.log("Sending OTP request...");
  const res = await axios.post(`${API_URL}/auth/send-register-otp`, { email: form.email }); 
  console.log("send-otp response:", res);

  if (res.status === 200 || res.status === 201) {
    console.log("Navigate called");
    navigate("/verify-otp", { state: { form, userType: "organization" } });
  } else {
    console.log("Unexpected status:", res.status);
  }
} catch (err) {
  console.error("send-otp API error:", err);
  alert(err.response?.data?.message || "Failed to send OTP");
}
};


  

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-2">Organization Registration</h2>
      <p className="text-sm text-gray-500 mb-6">
        Provide accurate details about your organization to proceed.
      </p>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          name="orgName"
          value={form.orgName}
          onChange={handleChange}
          placeholder="Organization Name"
          className="p-2 border rounded"
          required
        />
        <select
          name="orgType"
          value={form.orgType}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Type</option>
          <option>Corporation</option>
          <option>NGO</option>
        </select>

        <select
          name="industry"
          value={form.industry}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Industry</option>
          <option>Energy</option>
          <option>Technology</option>
        </select>
        <select
          name="employeeCount"
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Employees</option>
          <option>1-50</option>
          <option>51-200</option>
          <option>201-500</option>
        </select>

        <input
          name="website"
          value={form.website}
          onChange={handleChange}
          placeholder="Website"
          className="p-2 border rounded"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="p-2 border rounded"
          required
        />
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
          className="p-2 border rounded"
          required
        />
        <input
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State"
          className="p-2 border rounded"
          required
        />
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className="p-2 border rounded"
          required
        />
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="p-2 border rounded"
          required
        />
        <input
          name="designation"
          value={form.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
         onChange={handleChange}
          placeholder="Email"
          className="p-2 border rounded"
          required
        />
{emailChecking && (
  <p className="col-span-2 text-blue-500 text-sm">Checking email...</p>
)}
{emailError && (
  <p className="col-span-2 text-red-500 text-sm">{emailError}</p>
)}


        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="p-2 border rounded"
          required
        />

   <div className="col-span-2 flex items-center gap-2">
  <input
    type="checkbox"
    name="termsAgreed"
    checked={form.termsAgreed}
    onChange={handleChange}
  />
  <label className={`text-sm ${!form.termsAgreed ? "text-red-600" : ""}`}>
    I agree to the{" "}
    <a href="#" className="text-green-600 underline">
      Terms & Conditions
    </a>{" "}
    *
  </label>
</div>


       <button
  type="submit"
  disabled={loading || !form.termsAgreed}
  className={`col-span-2 py-2 rounded mt-2 text-white 
    ${!form.termsAgreed ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-gray-400"}`}
>
  {loading ? "Registering..." : "Register Organization"}
</button>


      <Link
  to="/signin"
  className="col-span-2 block w-full mt-6 py-3 text-center border-2 border-green-700 text-green-700 font-semibold rounded-lg
             hover:bg-green-700 hover:text-white transition-colors duration-300
             focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-2"
  aria-label="Sign in to your Aearthex account"
>
  Already have an account? Sign In
</Link>
      </form>
    </div>
  );
};

export default Register;
