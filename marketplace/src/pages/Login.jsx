import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginOrganization, loginIndividual } from "../../../shared-redux/src/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [role, setRole] = useState("organization"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      let result;

      if (role === "organization") {
        result = await dispatch(loginOrganization({ email, password })).unwrap();
      } else {
        result = await dispatch(loginIndividual({ email, password })).unwrap(); 
      }

      const { user } = result;

      if (user.role === "admin") {
  window.location.href = "http://localhost:5175/dashboard"; 
} else {
  navigate("/");
}

    } catch (err) {
      setError(err || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Aearthex</h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="flex gap-4 justify-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="organization"
                checked={role === "organization"}
                onChange={() => setRole("organization")}
              />
              <span className="text-sm text-gray-700">Organization</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="individual"
                checked={role === "individual"}
                onChange={() => setRole("individual")}
              />
              <span className="text-sm text-gray-700">Individual</span>
            </label>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
<div className="text-right">
  <button
    type="button"
    onClick={() => navigate("/forgot-password")}
    className="text-sm text-emerald-600 hover:underline focus:outline-none"
  >
    Forgot Password?
  </button>
</div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-600"
            } transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
