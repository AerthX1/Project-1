import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../shared-redux/src/slices/authSlice";
import { fetchProfile } from "../../../../shared-redux/src/slices/profileSlice";
import DefaultAvatar from "../Header/DefaultAvatar";
import ProfileDropdown from "../Header/ProfileDropdown";
import { CiSearch } from "react-icons/ci";
import aerthxlogo from "../../assets/AerthXLogo.png";

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

  const decodeJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to decode JWT:", e);
      return null;
    }
  };

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
    <nav className="bg-white shadow-lg w-full px-4 py-3 lg:px-8 fixed top-0 z-50">
      <div className="flex justify-between items-center gap-4 h-14">
      <img src={aerthxlogo} alt="AerthX Logo" className="h-16 sm:h-16 ml-3 object-contain" />
      
        {isHomePage && (
          <div className="relative flex items-center w-full max-w-md mx-4 md:mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search carbon projects..."
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
            />
            <button
              onClick={handleSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-500 transition-colors"
            >
              <CiSearch className="h-6 w-6" />
            </button>
          </div>
        )}

        <div className="relative flex items-center space-x-4">
          {isAuthenticated ? (
            <div ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <DefaultAvatar
                  name={user.fullName || user.orgName || "User"}
                  size={40}
                  avatarUrl={
                    profile?.user?.avatarUrl
                      ? `${
                          import.meta.env.VITE_API_URL.replace("/api", "")
                        }${profile.user.avatarUrl}`
                      : profile?.org?.avatarUrl
                      ? `${
                          import.meta.env.VITE_API_URL.replace("/api", "")
                        }${profile.org.avatarUrl}`
                      : user.avatarUrl
                      ? `${
                          import.meta.env.VITE_API_URL.replace("/api", "")
                        }${user.avatarUrl}`
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
              className="px-6 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-all shadow-md"
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