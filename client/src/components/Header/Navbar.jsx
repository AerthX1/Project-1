import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../shared-redux/src/slices/authSlice";
import { fetchProfile } from "../../../../shared-redux/src/slices/profileSlice";
import ProfileDropdown from "./ProfileDropdown";
import DefaultAvatar from "./DefaultAvatar";
import aerthxlogo from "../../assets/aerthxlogo.png";
import { FaBell } from "react-icons/fa"; 

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false); 
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const profile = useSelector((state) => state.profile.data);
  const token = useSelector((state) => state.auth.token);
  const userType = useSelector((state) => state.auth.userType);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null); 
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
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
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
    if (token && userType) {
      dispatch(fetchProfile({ token, userType }));
    }
  }, [token, userType, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

const toggleNotifications = async () => {
  const newState = !notificationsOpen;
  setNotificationsOpen(newState);
  setDropdownOpen(false);

  if (newState && unreadCount > 0) {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/user/notifications/mark-read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userType }),
      });

      const updated = notifications.map(n => ({ ...n, read: true }));
      setNotifications(updated);
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  }
};

const handleNotificationClick = async (id) => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/user/notifications/mark-one/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const updated = notifications.map(n =>
      n._id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);

    setUnreadCount(prev => Math.max(prev - 1, 0));
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};



useEffect(() => {
  const fetchNotifications = async () => {
    if (!token || !userType) return;

    try {
      const endpoint =
        userType?.toLowerCase() === "organization"
          ? "organization"
          : "individual";

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/notifications/${endpoint}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setNotifications(data.notifications || []);
      setUnreadCount((data.notifications || []).filter(n => !n.read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  fetchNotifications();
}, [token, userType]);


  return (
    <nav className="bg-white shadow-md w-full px-4 lg:px-6 relative z-50 h-16 sm:h-20">
      <div className="flex justify-between items-center h-full">
        <div
          className="flex items-center space-x-2 cursor-pointer h-full"
          onClick={() => navigate("/")}
        >
          <img src={aerthxlogo} alt="AerthX Logo" className="h-16 sm:h-16 ml-5 object-contain" />
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
    to={userType === "Organization" ? "/pricing" : "/individual-pricing"}
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
            <div className="flex items-center gap-4">
              <li className="relative" ref={notificationsRef}>
                <button
                  onClick={toggleNotifications}
                  className="relative p-2 text-gray-600 hover:text-green-500 transition-colors duration-200"
                >
                  <FaBell size={24} />
                 {unreadCount > 0 && (
  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
    {unreadCount}
  </span>
)}

                </button>
     {notificationsOpen && (
  <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl ring-1 ring-black/5 z-50 overflow-hidden transform transition duration-300 origin-top-right scale-100 opacity-100">

    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
      <h3 className="text-base font-semibold text-gray-800">Alerts & Notifications</h3>
      {unreadCount > 0 && (
        <span className="text-xs font-medium bg-red-500 text-white px-2 py-0.5 rounded-full shadow-sm">
          {unreadCount} new
        </span>
      )}
    </div>

    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
  <div
    key={notification._id}
    onClick={() => handleNotificationClick(notification._id)} 
   className={`px-4 py-3 text-sm transition-colors duration-200 cursor-pointer hover:bg-gray-100 ${
      !notification.read ? "bg-green-100" : "bg-white"
    }`}
  >
    <p className="font-medium text-gray-800">{notification.title}</p>
    <p className="text-gray-600 text-xs mt-1 leading-snug truncate">
      {notification.message}
    </p>
    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">
      {new Date(notification.timestamp).toLocaleString()}
    </p>
  </div>
))
      ) : (
        <div className="px-4 py-8 text-center text-gray-500 text-sm">
          <svg className="w-6 h-6 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          <p className="font-medium">No Pending Alerts</p>
          <p className="text-xs mt-0.5">You're all caught up!</p>
        </div>
      )}
    </div>

    <div className="px-4 py-3 border-t border-gray-100 bg-white text-center">
      <Link
        to="/notification"
        className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
      >
        View All Notifications &rarr;
      </Link>
    </div>
  </div>
)}

              </li>
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                    setNotificationsOpen(false); 
                  }}
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
            </div>
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