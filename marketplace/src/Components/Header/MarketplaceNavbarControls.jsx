import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "../../../../shared-redux/src/slices/authSlice";
import { fetchProfile } from "../../../../shared-redux/src/slices/profileSlice";
import DefaultAvatar from "../Header/DefaultAvatar";
import ProfileDropdown from "../Header/ProfileDropdown";

const MarketplaceNavbarControls = ({ onSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;
  const isHomePage = location.pathname === "/";

  const [dropdownOpen, setDropdownOpen] = useState(false);
const profile = useSelector((state) => state.profile.data);
const token = useSelector((state) => state.auth.token);
const userType = useSelector((state) => state.auth.userType);
const dropdownRef = useRef(null);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

function decodeJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode JWT:", e);
    return null;
  }
}

useEffect(() => {
  if (!token) return;

  try {
    const decoded = decodeJwt(token);
    if (!decoded) throw new Error("Invalid token");

    if (decoded.exp * 1000 < Date.now()) {
      console.log("Token expired, logging out");
      dispatch(logout());
      navigate("/signin");
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    dispatch(logout());
    navigate("/signin");
  }
}, [token, dispatch, navigate]);


useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


useEffect(() => {
  if (token && userType) {
    dispatch(fetchProfile({ token, userType }));
  }
}, [token, userType, dispatch]);



  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md w-full px-4 py-3 lg:px-8 fixed top-0 z-50" ref={dropdownRef}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-2xl font-bold text-black">AerthX</h1>
        </div>

        {isHomePage && (
             <div className="flex items-center gap-2 w-full md:w-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search carbon projects..."
        className="w-full md:w-[280px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
      >
        Search
      </button>
    </div>
        )}

        <div className="relative">
          {isAuthenticated ? (
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2"
              >
              <DefaultAvatar
  name={user.fullName || user.orgName || "User"}
  size={40}
  avatarUrl={
    profile?.user?.avatarUrl
      ? `${import.meta.env.VITE_API_URL.replace("/api", "")}${profile.user.avatarUrl}`
      : profile?.org?.avatarUrl
        ? `${import.meta.env.VITE_API_URL.replace("/api", "")}${profile.org.avatarUrl}`
        : user.avatarUrl
          ? `${import.meta.env.VITE_API_URL.replace("/api", "")}${user.avatarUrl}`
          : null
  }
/>
              
              </button>
              {dropdownOpen && (
                <ProfileDropdown
                  onClose={() => setDropdownOpen(false)}
                  onLogout={handleLogout}
                />
              )}
            </div>
          ) : (
            <Link
              to="/register-choice"
              className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MarketplaceNavbarControls;
  