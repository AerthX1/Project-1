import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType"); 

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const endpoint =
          userType === "Organization"
            ? "organization"
            : "individual";

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/notifications/${endpoint}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Notification API Response:", res.data);
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
        <FaBell className="text-3xl text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">Loading...</div>
      ) : notifications.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No new notifications 🎉</div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n, idx) => (
            <div
              key={idx}
              className="relative group bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm transition-all"
            >
              {!n.read && (
                <span className="absolute top-4 left-4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              )}

              <div className="flex justify-between items-start mb-1">
                <h2 className="text-lg font-semibold text-gray-800">{n.title || "No Title"}</h2>
                <time className="text-sm text-gray-400">
                  {new Date(n.timestamp).toLocaleString()}
                </time>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {n.message || "No message provided."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
