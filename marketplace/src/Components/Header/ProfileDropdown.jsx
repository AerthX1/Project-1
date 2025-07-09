import React from "react";
import { Link } from "react-router-dom";
import { FaGlobe, FaQuestionCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import DefaultAvatar from "../../../../client/src/components/Header/DefaultAvatar";

const ProfileDropdown = ({ onClose, onLogout }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) return null;

  return (
    <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-lg z-50 p-6 border border-gray-200">
      <div className="flex items-center gap-4 mb-6">
        <DefaultAvatar name={user.fullName || user.orgName || "User"} size={48} />
        <div>
          <p className="font-semibold text-gray-900 text-lg truncate max-w-[220px]">
            {user.fullName || user.orgName || "User"}
          </p>
          <p className="text-sm text-gray-500 truncate max-w-[220px]">{user.email}</p>
        </div>
      </div>

     <Link
     to="/dashboard"
  className="block w-full py-2 mb-5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition text-center"
>
  Switch to Organization Dashboard
</Link>

      <ul className="text-sm space-y-3">
        <li>
              <a
  href="http://localhost:5173/profile" 
            onClick={onClose}
            className="block px-4 py-2 rounded-md hover:bg-indigo-50  text-gray-700 transition"
          >
            Profile
          </a>
        </li>
         <li>
              <Link
  to="/marketplace"
            onClick={onClose}
            className="block px-4 py-2 rounded-md hover:bg-indigo-50 font-medium transition"
          >
            MarketPlace
          </Link>
        </li>
        <li>
       <a
  href="http://localhost:5173/pricing" 
  onClick={onClose}
  className="block px-4 py-2 rounded-md hover:bg-indigo-50 text-gray-700 transition"
>
  Subscription
</a>

        </li>
        <li>
           <a
  href="notification" 
           
            onClick={onClose}
            className="block px-4 py-2 rounded-md hover:bg-indigo-50 text-gray-700 transition"
          >
            Notification
            
          </a>
        </li>
        <li>
          <a
  href="http://localhost:5173/help" 
           
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-indigo-50 text-gray-700 transition"
          >
            <FaQuestionCircle className="text-indigo-600" />
            Help & Support
          </a>
        </li>
        <li>
 
</li>
        <li>
              <a
  href="http://localhost:5173/settings" 
            onClick={onClose}
            className="block px-4 py-2 rounded-md hover:bg-indigo-50 text-gray-700 transition"
          >
            Settings
          </a>
        </li>
      </ul>

      <div className="flex justify-between items-center mt-6 text-sm text-gray-500 border-t border-gray-200 pt-4">
        <span className="flex items-center gap-1 text-gray-600">
          <FaGlobe />
          English
        </span>
        <span>₹ INR</span>
      </div>

      <button
        onClick={onLogout}
        className="w-full mt-5 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition"
      >
       Sign out
      </button>
    </div>
  );
};

export default ProfileDropdown;
