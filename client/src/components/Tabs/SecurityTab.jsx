  import React, { useState, useEffect } from "react";
  import {
    FaEye,
    FaEyeSlash,
    FaLock,
    FaShieldAlt,
     FaMobileAlt,
     FaEnvelopeOpenText,
     FaHistory,
     FaSignOutAlt,
     FaTrashAlt,
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
      if (form.newPassword.length < 8)
        errs.newPassword = "At least 8 characters.";
      if (strength?.score < 2)
        errs.newPassword = "Try a stronger password.";
      if (form.newPassword !== form.confirmPassword)
        errs.confirmPassword = "Passwords must match.";
      if (!form.currentPassword)
        errs.currentPassword = "Enter current password.";
      return errs;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length) return setErrors(errs);
      setIsModalOpen(true);
    };

    const confirmSubmit = () => {
      setIsModalOpen(false);
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Password successfully updated.");
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }, 2000);
    };

    return (
      <div className="max-w-3xl mx-auto space-y-10">
        <Toaster />

        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <FaShieldAlt className="text-green-600" /> Account Security
          </h2>
          <p className="text-gray-500">
            Manage your account protection settings.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <FaLock className="text-green-600" /> Change Password
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {["currentPassword", "newPassword", "confirmPassword"].map((field, idx) => {
              const labels = {
                currentPassword: "Current Password",
                newPassword: "New Password",
                confirmPassword: "Confirm New Password",
              };
              return (
                <div key={field}>
                  <label className="block font-medium mb-1">{labels[field]}</label>
                  <div className="relative">
                    <input
                      type={showPassword[field.replace("Password", "")] ? "text" : "password"}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      className={`w-full border ${
                        errors[field] ? "border-red-500" : "border-gray-300"
                      } rounded px-4 py-2 pr-10 focus:ring focus:ring-green-200`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePassword(field.replace("Password", ""))
                      }
                      className="absolute right-3 top-2 text-gray-500"
                    >
                      {showPassword[field.replace("Password", "")] ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>
                  {field === "currentPassword" && (
                    <div className="mt-2">
                      <Link
                        to="/forgot-password"
                        className="text-sm text-green-600 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  )}
                  {field === "newPassword" && form.newPassword && (
                    <div className="mt-2">
                      <div className="h-2 bg-gray-200 rounded overflow-hidden">
                        <div
                          style={{
                            width: `${(strength?.score + 1) * 20}%`,
                          }}
                          className={`h-full ${
                            ["bg-red-500", "bg-yellow-400", "bg-green-600"][
                              Math.min(strength?.score, 2)
                            ]
                          }`}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {["Very weak", "Weak", "Fair", "Good", "Strong"][
                          strength?.score
                        ] || ""}
                      </p>
                    </div>
                  )}
                  {errors[field] && (
                    <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
                  )}
                </div>
              );
            })}

            <p className="text-gray-500 text-sm">
              You’ll be logged out from other devices after updating.
            </p>
            <button
              type="submit"
              className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    className="opacity-25 stroke-current"
                    strokeWidth="4"
                  />
                </svg>
              ) : (
                <FaLock />
              )}
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
          </form>

          <Dialog
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            className="relative z-50"
          >
            <div
              className="fixed inset-0 bg-black/30"
              aria-hidden="true"
            />
            <div className="fixed inset-0 flex items-center justify-center">
              <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-sm">
                <Dialog.Title className="text-lg font-semibold">
                  Confirm Password Change
                </Dialog.Title>
                <p className="mt-2 text-sm text-gray-600">
                  This will log out all your active sessions. Continue?
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
  <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
      <FaMobileAlt className="text-green-600" />
      Two-Factor Authentication (2FA)
    </h3>
    <p className="text-gray-500 mb-4">
      Add an extra layer of protection with phone verification.
    </p>
    <button className="border border-green-600 text-green-600 px-5 py-2 rounded-md hover:bg-green-50 transition">
      Enable 2FA
    </button>
  </div>

  <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
      <FaEnvelopeOpenText className="text-green-600" />
      Recovery Email & Phone
    </h3>
    <p className="text-gray-500 mb-4">Used for password reset or activity alerts.</p>
    <ul className="space-y-2 text-sm text-gray-700">
      <li>📧 Email: <span className="font-medium">hardik@email.com</span></li>
      <li>📱 Phone: <span className="font-medium">+91 98765 43210</span></li>
    </ul>
    <button className="mt-4 text-green-600 hover:underline text-sm">
      Manage Recovery Options
    </button>
  </div>

  <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
      <FaHistory className="text-green-600" />
      Recent Login Activity
    </h3>
    <ul className="text-sm text-gray-700 space-y-1">
      <li>📍 Mumbai · Chrome · Today 8:45 PM</li>
      <li>📍 Palghar · Firefox · Yesterday 11:22 AM</li>
      <li>📍 Delhi · Mobile · 2 days ago</li>
    </ul>
    <button className="mt-3 text-green-600 hover:underline text-sm">
      See All Activity
    </button>
  </div>

  <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
      <FaSignOutAlt className="text-green-600" />
      Active Sessions
    </h3>
    <p className="text-gray-500 mb-4">
      You're logged in on 3 devices. Log out others to secure your account.
    </p>
    <button className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition">
      Logout Other Devices
    </button>
  </div>

  <div className="bg-white p-6 rounded-xl shadow border border-red-200">
    <h3 className="text-xl font-semibold text-red-600 mb-2 flex items-center gap-2">
      <FaTrashAlt className="text-red-600" />
      Danger Zone
    </h3>
    <p className="text-sm text-gray-600 mb-4">
      Once deleted, your account is gone forever. Be sure before continuing.
    </p>
    <button className="bg-red-100 text-red-700 border border-red-300 px-5 py-2 rounded-md hover:bg-red-200 transition text-sm">
      Delete My Account
    </button>
  </div>

      </div>
    );
  };

  export default SecurityTab;
