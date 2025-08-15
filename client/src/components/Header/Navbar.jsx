import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout,setUser } from "../../../../shared-redux/src/slices/authSlice";
import { fetchProfile } from "../../../../shared-redux/src/slices/profileSlice";
import ProfileDropdown from "./ProfileDropdown";
import DefaultAvatar from "./DefaultAvatar";
import aerthxlogo from "../../assets/aerthxlogo.png";


const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
const profile = useSelector((state) => state.profile.data);
const token = useSelector((state) => state.auth.token);
const userType = useSelector((state) => state.auth.userType);
const dropdownRef = useRef(null);
  const isAuthenticated = !!user && !!token;

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
  if (!token) {
    // console.log("No token found");
    return;
  }

  //   console.log("Navbar: Token in Redux state:", token);

  // console.trace("Token trace in Navbar");
  try {
    const decoded = decodeJwt(token);
    if (!decoded) throw new Error("Invalid token");

    // console.log("Decoded token:", decoded);
    // console.log("Token expiry (ms):", decoded.exp * 1000);
    // console.log("Current time (ms):", Date.now());

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
  if (token && userType) {
    dispatch(fetchProfile({ token, userType }));
  }
}, [token, userType, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md w-full px-4 py-3 lg:px-6 lg:py-4 relative z-50" ref={dropdownRef}>
      <div className="flex justify-between items-center">
       <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
  <img src={aerthxlogo} alt="AerthX Logo" className="h-10 sm:h-12 ml-1   object-contain" />
</div>


        <ul className="flex items-center gap-6 xl:gap-9 text-lg xl:text-xl font-bold text-gray-800">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-1 ${isActive ? "text-emerald-400" : "text-black"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/MarketplaceHero"
              className={({ isActive }) =>
                `flex items-center gap-1 ${isActive ? "text-emerald-400" : "text-black"}`
              }
            >
              Marketplace
            </NavLink>
          </li>

          <li className="relative group">
            <NavLink
              to="/solutions"
              className={({ isActive }) =>
                `flex items-center gap-1 ${isActive ? "text-emerald-400" : "text-black"}`
              }
            >
              Solutions <span>▾</span>
            </NavLink>
            <div className="absolute top-7 -left-7 bg-white shadow-lg border rounded-md px-4 py-2 z-10 hidden group-hover:block">
              <Link to="/solutions/business" className="block p-3 hover:text-green-600">
                Businesses
              </Link>
              <Link to="/solutions/individuals" className="block p-3 hover:text-green-600">
                Individuals
              </Link>
              <Link to="/solutions/api" className="block p-3 hover:text-green-600">
                API & Integration
              </Link>
            </div>
          </li>
          <li>
           <NavLink
              to="/services"
              className={({ isActive }) =>
                `flex items-center gap-1 ${isActive ? "text-emerald-400" : "text-black"}`
              }
            >
              Services
           </NavLink>
         </li>
          <li>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `flex items-center gap-1 ${isActive ? "text-emerald-400" : "text-black"}`
              }
            >
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                `flex items-center gap-1 ${isActive ? "text-emerald-400" : "text-black"}`
              }
            >
              Resources
            </NavLink>
          </li>

          {isAuthenticated ? (
            <li className="relative">
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
                <ProfileDropdown onClose={() => setDropdownOpen(false)} onLogout={handleLogout} />
              )}
            </li>
          ) : (
            <li>
              <Link
                to="/register-choice"
                className="ml-2 xl:ml-4 px-3 xl:px-4 py-2 bg-green-400 text-white rounded-lg font-semibold hover:bg-green-500 transition-all"
              >
                Register Here
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;