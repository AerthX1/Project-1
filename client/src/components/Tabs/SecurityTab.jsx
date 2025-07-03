import React, { useState, useEffect } from "react";
import {
  FaEye, FaEyeSlash, FaLock, FaShieldAlt, FaMobileAlt,
  FaEnvelopeOpenText, FaHistory, FaSignOutAlt, FaTrashAlt,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import zxcvbn from "zxcvbn";
import { Link } from "react-router-dom";

const SecurityTab = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [strength, setStrength] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    setStrength(zxcvbn(form.newPassword));
  }, [form.newPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const togglePassword = (field) =>
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });

  const validate = () => {
    const errs = {};
    if (!form.currentPassword) errs.currentPassword = "Enter current password.";
    if (form.newPassword.length < 8) errs.newPassword = "At least 8 characters.";
    if (strength?.score < 2) errs.newPassword = "Try a stronger password.";
    if (form.newPassword !== form.confirmPassword) errs.confirmPassword = "Passwords must match.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setIsModalOpen(true);
  };

  const confirmSubmit = async () => {
    setIsModalOpen(false);
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const userType = localStorage.getItem("userType") || "Individual";

  const res = await fetch(
  `${import.meta.env.VITE_API_URL}/auth/change-password/${userType.toLowerCase()}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
      userType,
    }),
  }
);


      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Password update failed");

      toast.success("Password successfully updated.");

      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 1500);

      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setShowPasswordForm(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 py-10 px-4">
      <Toaster />
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3 mb-1">
          <FaShieldAlt className="text-green-600 text-2xl" />
          Account Security
        </h2>
        <p className="text-gray-500">Manage your security settings and credentials.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaLock className="text-green-600" />
            Change Password
          </h3>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="text-sm text-green-600 border border-green-600 px-4 py-1.5 rounded hover:bg-green-50 transition"
          >
            {showPasswordForm ? "Cancel" : "Update Password"}
          </button>
        </div>

        {showPasswordForm && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {["currentPassword", "newPassword", "confirmPassword"].map((field) => {
              const labels = {
                currentPassword: "Current Password",
                newPassword: "New Password",
                confirmPassword: "Confirm New Password",
              };
              const key = field.replace("Password", "");

              return (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {labels[field]}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword[key] ? "text" : "password"}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      className={`w-full border ${
                        errors[field] ? "border-red-500" : "border-gray-300"
                      } rounded-md px-4 py-2 pr-10 focus:ring focus:ring-green-200 outline-none`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePassword(key)}
                      className="absolute right-3 top-2.5 text-gray-500"
                    >
                      {showPassword[key] ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {field === "currentPassword" && (
                    <div className="mt-2">
                      <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  )}
                  {field === "newPassword" && form.newPassword && (
                    <div className="mt-2">
                      <div className="h-2 bg-gray-200 rounded overflow-hidden">
                        <div
                          style={{ width: `${(strength?.score + 1) * 20}%` }}
                          className={`h-full ${
                            ["bg-red-500", "bg-yellow-400", "bg-green-600"][Math.min(strength?.score, 2)]
                          }`}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {["Very weak", "Weak", "Fair", "Good", "Strong"][strength?.score] || ""}
                      </p>
                    </div>
                  )}
                  {errors[field] && <p className="text-xs text-red-500 mt-1">{errors[field]}</p>}
                </div>
              );
            })}

            <p className="text-sm text-gray-500">
              You will be logged out from all devices after this change.
            </p>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" className="opacity-25 stroke-current" strokeWidth="4" />
                </svg>
              ) : (
                <FaLock />
              )}
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-sm">
              <Dialog.Title className="text-lg font-semibold">
                Confirm Password Change
              </Dialog.Title>
              <p className="mt-2 text-sm text-gray-600">
                This will log you out from all active sessions. Do you want to continue?
              </p>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Confirm
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default SecurityTab;
