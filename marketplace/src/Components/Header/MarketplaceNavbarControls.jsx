  import React, { useEffect, useState, useRef } from "react";
  import { Link, useNavigate, useLocation } from "react-router-dom";
  import { useSelector, useDispatch } from "react-redux";
  import { logout } from "../../../../shared-redux/src/slices/authSlice";
  import { fetchProfile } from "../../../../shared-redux/src/slices/profileSlice";
  import DefaultAvatar from "../Header/DefaultAvatar";
  import ProfileDropdown from "../Header/ProfileDropdown";
  import { CiSearch } from "react-icons/ci";
  import { FaBell } from "react-icons/fa";
  import aerthxlogo from "../../assets/AerthXLogo.png";

  const MarketplaceNavbarControls = ({ onSearch }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = !!user;
    const isHomePage = location.pathname === "/";

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const profile = useSelector((state) => state.profile.data);
    const token = useSelector((state) => state.auth.token);
    const userType = useSelector((state) => state.auth.userType);
    const dropdownRef = useRef(null);
    const notificationsRef = useRef(null);
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
              <div className="flex items-center gap-4">
                <div className="relative" ref={notificationsRef}>
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
            className={`px-4 py-3 text-sm transition-colors duration-200 cursor-pointer hover:bg-gray-100 ${
              !notification.read ? "bg-slate-50 border-l-4 border-indigo-500" : "bg-white"
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

         </div>
                <div ref={dropdownRef}>
                  <button
                    onClick={() => {
                      setDropdownOpen(!dropdownOpen);
                      setNotificationsOpen(false);
                    }}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
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