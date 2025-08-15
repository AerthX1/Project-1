import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdNotificationsActive, MdOutlineNotificationsNone } from "react-icons/md";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const endpoint =
          userType?.toLowerCase() === "organization"
            ? "organization"
            : "individual";

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/notifications/${endpoint}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setNotifications(res.data.notifications || []);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col items-center gap-3 mb-8 text-center">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-5 rounded-full shadow-lg">
          <FaBell className="text-4xl text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Notifications
        </h1>
        <p className="text-gray-500 text-sm">
          Your latest updates and important alerts.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 text-lg animate-pulse">
          Loading notifications...
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <MdOutlineNotificationsNone className="text-5xl mb-3" />
          <p className="text-lg">No new notifications 🎉</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative group backdrop-blur-md bg-white/70 border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {!n.read && (
                <span className="absolute top-4 left-4 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_6px_2px_rgba(99,102,241,0.6)] animate-pulse" />
              )}

              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <MdNotificationsActive
                    className={`text-lg ${
                      n.read ? "text-gray-400" : "text-indigo-500"
                    }`}
                  />
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {n.title || "No Title"}
                  </h2>
                </div>
                <time className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                  {new Date(n.timestamp).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </time>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {n.message || "No message provided."}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
