import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../../../shared-redux/src/slices/profileSlice";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import DefaultAvatar from "../components/Header/DefaultAvatar";
import { setUser } from "../../../shared-redux/src/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { data: profileData } = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token);
  const userType = useSelector((state) => state.auth.userType);

  const [form, setForm] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (token && userType) {
      dispatch(fetchProfile({ token, userType }));
    }
  }, [token, userType]);

 useEffect(() => {
  if (profileData) {
    const data =
      profileData.org || profileData.user || profileData; 

    setForm({
      orgName: data.orgName || "",
      fullName: data.fullName || "",
      orgType: data.orgType || "",
      industry: data.industry || "",
      website: data.website || "",
      email: data.email || "",
      description: data.description || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      phone: data.phone || "",
      designation: data.designation || "",
    });

    if (data.avatarUrl) {
      setAvatar(`${import.meta.env.VITE_API_URL.replace("/api", "")}${data.avatarUrl}`);
    }
  }
}, [profileData]);


  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(file);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form && token) {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }
      if (avatar instanceof File) {
        formData.append("avatar", avatar);
      }

        try {
       const res = await dispatch(updateProfile({ token, userType, formData }));
if (res.payload?.avatarUrl) {
  const fullAvatarUrl = `${import.meta.env.VITE_API_URL.replace("/api", "")}${res.payload.avatarUrl}`;
  

  const updatedUser = {
    ...(userType === "organization" ? res.payload.org : res.payload.user),
    avatarUrl: res.payload.avatarUrl, 
  };

  dispatch(setUser(updatedUser));
  localStorage.setItem("user", JSON.stringify(updatedUser));
}
     

      } catch (error) {
        console.error("Error updating profile:", error);
      }

    }
  };

  const inputDescriptions = {
    orgName: "The legal name of your organization.",
    orgType: "Type of entity like NGO, Private Ltd., etc.",
    industry: "The industry your organization belongs to.",
    website: "Official website URL.",
    phone: "Organization’s contact number.",
    fullName: "Representative or contact person’s full name.",
    city: "City where the org is located.",
    state: "State of the organization.",
    country: "Country where your org operates.",
    designation: "Role of the representative (e.g., CEO, Manager).",
  };

  if (!form)
    return <div className="text-center mt-10 text-gray-600">Loading profile...</div>;

  const previewAvatar =
    avatar instanceof File ? URL.createObjectURL(avatar) : avatar;

  const inputFields =
    userType === "organization"
      ? [
          ["Organization Name", "orgName"],
          ["Organization Type", "orgType"],
          ["Industry", "industry"],
          ["Phone", "phone"],
          ["Full Name", "fullName"],
          ["Website", "website"],
          ["City", "city"],
          ["State", "state"],
          ["Country", "country"],
          ["Designation", "designation"],
        ]
      : [
          ["Full Name", "fullName"],
          ["Phone", "phone"],
          ["City", "city"],
          ["State", "state"],
          ["Country", "country"],
          ["Designation", "designation"],
        ];

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 md:px-20 text-white">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            {previewAvatar ? (
             <img
  src={`${previewAvatar}?t=${Date.now()}`} 
  alt="Avatar"
  className="w-32 h-32 rounded-full object-cover border-4 border-green-500 shadow-lg"
/>

            ) : (
              <div className="w-32 h-32 border-4 border-green-500 rounded-full overflow-hidden bg-green-700">
                <DefaultAvatar name={form.orgName?.trim() || form.fullName || ""} size={128} />
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full text-white cursor-pointer hover:bg-green-600 shadow-md">
              <FaEdit />
              <input type="file" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>
          <h2 className="text-2xl font-bold text-white mt-4">
            {userType === "organization" ? form.orgName : form.fullName}
          </h2>
          <p className="text-gray-300">{form.email}</p>
        </div>

        {successMsg && (
          <div className="text-green-400 text-sm font-medium text-center mb-6">
            {successMsg}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-sm text-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map(([label, name]) => (
              <div key={name} className="flex flex-col gap-1 relative">
                <label className="mb-2 text-gray-400 font-medium">{label}</label>
                <div className="relative">
                  <input
                    type="text"
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl pr-10 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-150"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 group">
                    <FaInfoCircle className="text-gray-500 hover:text-green-400 cursor-pointer" />
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-xs text-gray-200 rounded-md px-3 py-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-64 z-50">
                      {inputDescriptions[name]}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-gray-400 font-medium mb-1">
                {userType === "organization" ? "About Organization" : "About Yourself"}
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="6"
                className="custom-scroll px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl 
                focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 
                transition-all duration-150 resize-none overflow-y-auto max-h-40"
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="mb-2 text-gray-400 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                readOnly
                className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>

        {userType === "organization" && (
          <div className="mt-10 bg-green-800/10 border border-green-600 text-green-200 px-6 py-5 rounded-xl max-w-5xl mx-auto relative">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <div className="relative group">
                <FaInfoCircle className="text-green-400 cursor-pointer" />
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-green-950 text-green-100 text-sm p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 border border-green-700">
                  Aerthx is committed to climate transparency and blockchain-backed carbon credits. Learn why we’re trusted by green leaders. (Upcoming)
                </div>
              </div>
              Why Organizations Trust Aerthx
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-green-100">
              <li>
                <span className="font-medium text-green-300">Verified Projects:</span> We only sell carbon credits from Verra and Gold Standard certified projects.
              </li>
              <li>
                <span className="font-medium text-green-300">On-Chain Proof:</span> Your certificates are recorded on blockchain, ensuring transparency.
              </li>
              <li>
                <span className="font-medium text-green-300">Privacy & Security:</span> All data is securely stored and encrypted.
              </li>
              <li>
                <span className="font-medium text-green-300">Trusted by Green Businesses:</span> Join companies leading the carbon-neutral movement.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
