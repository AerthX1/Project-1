import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../redux/profileSlice"; 
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const { data: profileData, loading } = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token); 

  const [form, setForm] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (token) dispatch(fetchProfile(token));
  }, [token]);

  useEffect(() => {
    if (profileData) {
      setForm({
        orgName: profileData.orgName || "",
        fullName: profileData.fullName || "",
        orgType: profileData.orgType || "",
        industry: profileData.industry || "",
        location: profileData.city
          ? `${profileData.city}, ${profileData.state}, ${profileData.country}`
          : "",
        founded: profileData.founded || "",
        employees: profileData.employees || "",
        website: profileData.website || "",
        email: profileData.email || "",
        description: profileData.bio || "",
      });
      if (profileData.avatarUrl) setAvatar(profileData.avatarUrl);
    }
  }, [profileData]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form && token) {
      dispatch(updateProfile({ token, formData: form }));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchProfile());
    }
  }, []);

  if (!form) {
    return (
      <div className="text-center mt-10 text-gray-600">Loading profile...</div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4 md:px-20">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-5xl mx-auto">

        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <img
              src={avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-green-300"
            />
            <label className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full text-white cursor-pointer hover:bg-green-600">
              <FaEdit />
              <input
                type="file"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {form.orgName}
          </h2>
          <p className="text-gray-600">{form.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <input
                type="text"
                name="orgName"
                value={form.orgName}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Organization Type
              </label>
              <input
                type="text"
                name="orgType"
                value={form.orgType}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter founder or full name"
                className="mt-1 w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-xl p-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                 readOnly
                className="mt-1 w-full border border-gray-300 rounded-xl p-3"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              About Organization
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 w-full border border-gray-300 rounded-xl p-3"
            ></textarea>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
