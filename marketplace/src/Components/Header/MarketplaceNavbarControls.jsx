import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "../../../../shared-redux/src/slices/authSlice";
import { fetchProfile } from "../../../../shared-redux/src/slices/profileSlice";
import DefaultAvatar from "../../../../client/src/components/Header/DefaultAvatar";
import ProfileDropdown from "../Header/ProfileDropdown";

const MarketplaceNavbarControls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;
  const isHomePage = location.pathname === "/";

  const [dropdownOpen, setDropdownOpen] = useState(false);

 useEffect(() => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  if (!user && token && userType) {
    dispatch(fetchProfile({ token, userType }))
      .unwrap()
      .then((response) => {
        const correctUser = userType === "organization" ? response.org : response.user;
        dispatch(setUser(correctUser));
      })
      .catch((error) => {
        console.error("❌ Failed to fetch and sync profile:", error);
      });
  }
}, [dispatch, user]);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md w-full px-4 py-3 lg:px-8 fixed top-0 z-50">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-2xl font-bold text-black">Aerthx</h1>
        </div>

        {isHomePage && (
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search carbon projects..."
              className="w-full md:w-[280px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none text-gray-600 text-sm">
              <option value="">All Types</option>
              <option value="forest">Reforestation</option>
              <option value="energy">Renewable Energy</option>
              <option value="waste">Waste Management</option>
            </select>
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
                  size={36}
                />
                <span className="text-gray-700 font-semibold hidden sm:inline">
                  {user.fullName?.split(" ")[0] || user.orgName}
                </span>
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
