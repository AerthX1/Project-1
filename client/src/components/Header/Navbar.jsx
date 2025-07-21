import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout,setUser } from "../../../../shared-redux/src/slices/authSlice";
import { fetchProfile } from "../../../../shared-redux/src/slices/profileSlice";
import ProfileDropdown from "./ProfileDropdown";
import DefaultAvatar from "./DefaultAvatar";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);



  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md w-full px-4 py-3 lg:px-6 lg:py-4 relative z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black">AerthX</h1>
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
                  size={36}
                />
                <span className="text-gray-700 font-semibold hidden sm:inline">
                  {user.fullName?.split(" ")[0] || user.orgName}
                </span>
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