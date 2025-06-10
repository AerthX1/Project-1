import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import ProfileDropdown from "./ProfileDropdown";
import DefaultAvatar from "./DefaultAvatar"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md w-full px-4 py-3 lg:px-6 lg:py-4 relative z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black">AerthX</h1>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black text-3xl focus:outline-none"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        <ul className="hidden lg:flex items-center gap-6 xl:gap-9 text-lg xl:text-xl font-bold text-gray-800">
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
              to="/marketplace"
              className={({ isActive }) =>
                `flex items-center gap-1 ${isActive ? "text-emerald-400" : "text-black"}`
              }
            >
              Marketplace
            </NavLink>
          </li>

          <li className="relative group">
            <NavLink
              to="/solution"
              className={({ isActive }) =>
                `flex items-center gap-1 ${isActive ? "text-emerald-400" : "text-black"}`
              }
            >
              Solutions <span>▾</span>
            </NavLink>
            <div className="absolute top-7 left-0 bg-white shadow-lg border rounded-md px-4 py-2 z-10 hidden group-hover:block">
              <Link to="/solution1" className="block py-1 hover:text-green-600">
                Solution 1
              </Link>
              <Link to="/solution2" className="block py-1 hover:text-green-600">
                Solution 2
              </Link>
            </div>
          </li>

          <li className="relative group">
            <NavLink
              to="/service"
              className={({ isActive }) =>
                `flex items-center gap-1 ${isActive ? "text-emerald-400" : "text-black"}`
              }
            >
              Services <span>▾</span>
            </NavLink>
            <div className="absolute top-7 left-0 bg-white shadow-lg border rounded-md px-4 py-2 z-10 hidden group-hover:block">
              <Link to="/service1" className="block py-1 hover:text-green-600">
                Service 1
              </Link>
              <Link to="/service2" className="block py-1 hover:text-green-600">
                Service 2
              </Link>
            </div>
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
      onClick={(e) => {
        const dropdown = e.currentTarget.nextSibling;
        dropdown.classList.toggle("hidden");
      }}
      className="flex items-center cursor-pointer select-none"
      aria-label="Toggle profile dropdown"
    >
      <DefaultAvatar
        name={user.fullName || user.orgName || "User"}
        size={36}
      />
    </button>
    <div className="absolute right-0 top-7 z-10 hidden">
      <ProfileDropdown onClose={() => {}} onLogout={handleLogout} />
    </div>
  </li>

          ) : (
            <li>
              <Link
                to="/register"
                className="ml-2 xl:ml-4 px-3 xl:px-4 py-2 bg-green-400 text-white rounded-lg font-semibold hover:bg-green-500 transition-all"
              >
                Register Here
              </Link>
            </li>
          )}

        
        </ul>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-4 text-lg text-gray-800 px-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-3xl font-bold"
            aria-label="Close menu"
          >
            ✕
          </button>

          <Link to="/" className="hover:text-green-600" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link
            to="/marketplace"
            className="hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Marketplace
          </Link>

          <div className="w-full max-w-xs text-center">
            <button
              className="w-full font-semibold"
              onClick={() => setShowSolutions(!showSolutions)}
              aria-expanded={showSolutions}
              aria-controls="mobile-solutions-menu"
            >
              Solutions {showSolutions ? "▲" : "▼"}
            </button>
            {showSolutions && (
              <div id="mobile-solutions-menu" className="mt-2 space-y-2">
                <Link to="/solution1" onClick={() => setIsMenuOpen(false)} className="block">
                  Solution 1
                </Link>
                <Link to="/solution2" onClick={() => setIsMenuOpen(false)} className="block">
                  Solution 2
                </Link>
              </div>
            )}
          </div>

          <div className="w-full max-w-xs text-center">
            <button
              className="w-full font-semibold"
              onClick={() => setShowServices(!showServices)}
              aria-expanded={showServices}
              aria-controls="mobile-services-menu"
            >
              Services {showServices ? "▲" : "▼"}
            </button>
            {showServices && (
              <div id="mobile-services-menu" className="mt-2 space-y-2">
                <Link to="/service1" onClick={() => setIsMenuOpen(false)} className="block">
                  Service 1
                </Link>
                <Link to="/service2" onClick={() => setIsMenuOpen(false)} className="block">
                  Service 2
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/pricing"
            className="hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            to="/resources"
            className="hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Resources
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="bg-blue-500 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="bg-red-500 text-white px-6 py-2 rounded-md font-medium hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/register"
              className="bg-green-500 text-white px-6 py-2 rounded-md font-medium hover:bg-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Register Here
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
