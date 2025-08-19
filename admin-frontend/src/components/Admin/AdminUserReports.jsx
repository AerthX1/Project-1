import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaCircle,
  FaEllipsisV,
  FaEnvelope,
  FaTrash,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
  FaBell,
} from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdminUserReports = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [emailLoading, setEmailLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [emailUserId, setEmailUserId] = useState(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailProblem, setEmailProblem] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reportToDeleteId, setReportToDeleteId] = useState(null);

  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationUserId, setNotificationUserId] = useState(null);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationLoading, setNotificationLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/admin/users-reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      showNotification("Failed to fetch users.", "error");
    }
  };

  const viewReports = async (userId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/admin/user-reports/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
      setSelectedUser(userId);
    } catch (err) {
      console.error(err);
      showNotification("Failed to fetch reports.", "error");
    } finally {
      setLoading(false);
    }
  };

  const openEmailModal = (userId, problem) => {
    setEmailUserId(userId);
    setEmailProblem(problem || "");
    setEmailMessage("");
    setEmailSubject("");
    setShowEmailModal(true);
    setMenuOpenId(null);
  };

  const handleSendEmail = async () => {
    setEmailLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/admin/send-email/${emailUserId}`,
        {
          subject: emailSubject,
          problem: emailProblem,
          message: emailMessage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showNotification("Email sent successfully!", "success");

      setShowEmailModal(false);
      setEmailSubject("");
      setEmailProblem("");
      setEmailMessage("");
      setEmailUserId(null);
    } catch (err) {
      console.error(err);
      showNotification("Failed to send email. Please try again.", "error");
    } finally {
      setEmailLoading(false);
    }
  };

  const openConfirmDeleteModal = (reportId) => {
    setReportToDeleteId(reportId);
    setShowConfirmModal(true);
    setMenuOpenId(null);
  };

  const handleDeleteReport = async () => {
    if (!reportToDeleteId) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/admin/delete-report/${reportToDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showNotification("Report deleted successfully!", "success");
      setReports((prev) => prev.filter((r) => r._id !== reportToDeleteId));
    } catch (err) {
      console.error(err);
      showNotification("Failed to delete report.", "error");
    } finally {
      setShowConfirmModal(false);
      setReportToDeleteId(null);
    }
  };

  const openNotificationModal = (userId) => {
    setNotificationUserId(userId);
    setNotificationTitle("");
    setNotificationMessage("");
    setShowNotificationModal(true);
    setMenuOpenId(null);
  };

  const handleSendNotification = async () => {
    setNotificationLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/admin/send-notification/${notificationUserId}`,
        {
          title: notificationTitle,
          description: notificationMessage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showNotification("Notification sent successfully!", "success");
      setShowNotificationModal(false);
      setNotificationTitle("");
      setNotificationMessage("");
      setNotificationUserId(null);
    } catch (err) {
      console.error(err);
      showNotification("Failed to send notification. Please try again.", "error");
    } finally {
      setNotificationLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const goBack = () => {
    setSelectedUser(null);
    setReports([]);
  };

  const getNotificationIcon = (type) => {
    if (type === "success") {
      return <FaCheckCircle className="inline mr-2 text-green-700" />;
    }
    return <FaExclamationCircle className="inline mr-2 text-red-700" />;
  };

  const renderReportsTable = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (reports.length === 0) {
      return <p>No reports found for this user.</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <div
            key={report._id}
            className="relative p-4 bg-white rounded-xl shadow border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{report.title}</h3>
              <div className="flex items-center gap-2">
                {!report.seen && (
                  <FaCircle className="text-green-500 text-xs" title="New" />
                )}
                <div className="relative">
                  <button
                    onClick={() =>
                      setMenuOpenId(menuOpenId === report._id ? null : report._id)
                    }
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <FaEllipsisV />
                  </button>
                  {menuOpenId === report._id && (
                    <div className="absolute right-0 mt-2 w-42 bg-white shadow-md rounded-lg border z-10">
                      <button
                        onClick={() =>
                          openEmailModal(report.userId, report.description)
                        }
                        className="flex items-center gap-2 px-4 py-2 w-full text-sm hover:bg-gray-100"
                      >
                        <FaEnvelope /> Send Email
                      </button>
                      <button
                        onClick={() => openNotificationModal(report.userId)}
                        className="flex items-center gap-2 px-4 py-2 w-full text-sm hover:bg-gray-100"
                      >
                        <FaBell /> Send Notification
                      </button>
                      <button
                        onClick={() => openConfirmDeleteModal(report._id)}
                        className="flex items-center gap-2 px-4 py-2 w-full text-sm hover:bg-gray-100 text-red-600"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">{report.description}</p>
            <p className="text-xs text-gray-400 mt-2">
              Submitted: {new Date(report.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderUsersTable = () => {
    const usersWithReports = users.filter((user) => user.reportsCount > 0);
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">User ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Reports</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersWithReports.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No users with reports.
                </td>
              </tr>
            ) : (
              usersWithReports.map((user) => (
                <tr key={user.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    {user.reportsCount}
                    {user.newReports > 0 && (
                      <FaCircle className="text-green-500 text-xs" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => viewReports(user.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                    >
                      <FaEye className="inline mr-1" /> View Reports
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderEmailModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Send Email</h3>
          <button onClick={() => setShowEmailModal(false)}>
            <FaTimes className="text-gray-600 hover:text-black" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Subject"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
          className="w-full border rounded-lg p-3 text-sm mb-3"
        />
        <div className="border rounded-lg p-3 text-sm bg-gray-100 mb-3">
          <strong>User's Problem:</strong>
          <p className="mt-1 text-gray-700">{emailProblem}</p>
        </div>
        <textarea
          value={emailMessage}
          onChange={(e) => setEmailMessage(e.target.value)}
          rows={6}
          className="w-full border rounded-lg p-3 text-sm"
          placeholder="Write your response/solution here..."
        />
        <div className="flex justify-end mt-4 gap-3">
          <button
            onClick={() => setShowEmailModal(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSendEmail}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
            disabled={emailLoading}
          >
            {emailLoading ? "Sending..." : "Send Email"}
          </button>
        </div>
      </div>
    </div>
  );

  const renderConfirmModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <FaExclamationCircle className="text-red-500 text-5xl mx-auto mb-4" />
        <h3 className="text-lg font-bold mb-2">Confirm Deletion</h3>
        <p className="mb-4 text-gray-600">Are you sure you want to delete this report? This action cannot be undone.</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setShowConfirmModal(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteReport}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Send Notification</h3>
          <button onClick={() => setShowNotificationModal(false)}>
            <FaTimes className="text-gray-600 hover:text-black" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Notification Title"
          value={notificationTitle}
          onChange={(e) => setNotificationTitle(e.target.value)}
          className="w-full border rounded-lg p-3 text-sm mb-3"
        />
        <textarea
          value={notificationMessage}
          onChange={(e) => setNotificationMessage(e.target.value)}
          rows={6}
          className="w-full border rounded-lg p-3 text-sm"
          placeholder="Write your notification message here..."
        />
        <div className="flex justify-end mt-4 gap-3">
          <button
            onClick={() => setShowNotificationModal(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSendNotification}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={notificationLoading}
          >
            {notificationLoading ? "Sending..." : "Send Notification"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {notification && (
        <div
          className={`mb-4 p-3 rounded-lg flex items-center ${
            notification.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {getNotificationIcon(notification.type)}
          {notification.message}
        </div>
      )}

      {selectedUser ? (
        <>
          <button
            onClick={goBack}
            className="mb-4 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          >
            Back
          </button>
          <h2 className="text-2xl font-bold mb-4">
            Reports from User ID: {selectedUser}
          </h2>
          {renderReportsTable()}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">Users and Reports</h2>
          {renderUsersTable()}
        </>
      )}

      {showEmailModal && renderEmailModal()}
      {showConfirmModal && renderConfirmModal()}
      {showNotificationModal && renderNotificationModal()}
    </div>
  );
};

export default AdminUserReports;