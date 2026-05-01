import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import {
  ShieldCheck,
  Leaf,
  MapPin,
  CalendarDays,
  Layers,
  Zap,
  BadgeCheck,
  FileText,
  Info,
  BookOpen,
  CheckCircle,
  Globe2,
  Phone,
} from "lucide-react";


const SingleProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${API}/carbon-credits`);
        const found = res.data.find((p) => p._id === id);
        setProject(found);
      } catch (err) {
        console.error("❌ Failed to load project:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, API]);


  const formatRupees = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

const handleBuyClick = () => {
  navigate("/PricingGateway", {
    state: {
      source: "individual",
      projectId: project._id,
      tons: 1,
      userType: userType,  
    },
  });
};

const loggedInUser = useSelector((state) => state.auth.user);
const userType = loggedInUser?.type || "Individual";

const handleContactClick = () => {
  navigate("/contact-form", { state: { project, userType } });
};

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading project...</div>;
  if (!project) return <div className="text-center mt-10 text-red-500">Project not found.</div>;

  return (
    <div className="min-h-screen w-full bg-white text-gray-800 font-sans">
      <div className="relative w-full h-[300px] sm:h-[360px] md:h-[420px] overflow-hidden">
        <img
  src={`${import.meta.env.VITE_FILE_URL}${project.image}`}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg leading-tight">
            {project.title}
          </h1>
          <p className="mt-4 text-gray-100 text-base sm:text-lg max-w-2xl">
            Contribute to a greener planet by supporting verified, impactful carbon credit projects.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow hover:scale-105 transition">
              <ShieldCheck className="h-4 w-4" /> Verified by {project.verifiedBy}
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-sm text-white backdrop-blur hover:scale-105 transition">
              <MapPin className="h-4 w-4" /> {project.city}, {project.country}
            </div>
          </div>
        </div>
      </div>

      <section className="px-6 sm:px-12 py-12 bg-gray-50 border-b border-gray-200">
        <div className="w-full mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-green-700">Project Overview</h2>
          </div>

          <div className="w-full text-center px-6 sm:px-12 pt-12 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-wide font-serif">
              {project.title}
            </h1>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8 text-gray-800 leading-relaxed text-base sm:text-lg tracking-wide">
            <p className="mb-4">{project.info}</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded-lg shadow-sm">
                <BadgeCheck className="text-green-600 w-6 h-6" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-sm sm:text-base font-semibold text-green-800">Verified by:</span>
                  <span className="text-sm sm:text-base text-gray-800">{project.verifiedBy}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="text-green-600 w-5 h-5 shrink-0" />
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-medium text-gray-600">Methodology:</span>
                  <span className="text-gray-800">{project.methodology}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12 py-12 bg-[#f8fafc]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Leaf className="text-green-600 w-6 h-6" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800">Category</h4>
            <p className="text-sm text-gray-600 mt-1">{project.category}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Layers className="text-green-600 w-6 h-6" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800">Type</h4>
            <p className="text-sm text-gray-600 mt-1">{project.projectType}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Zap className="text-green-600 w-6 h-6" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800">Vintage</h4>
            <p className="text-sm text-gray-600 mt-1">{project.vintage}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <CalendarDays className="text-green-600 w-6 h-6" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800">Duration</h4>
            <p className="text-sm text-gray-600 mt-1">{project.projectDuration}</p>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12 py-12 bg-white grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8 text-gray-800">
          <h3 className="text-xl font-semibold text-green-700 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-600" />
            Technical Details
          </h3>
          <ul className="space-y-5 text-base sm:text-lg">
            <li className="flex items-start gap-3"><BookOpen className="w-5 h-5 text-green-600 mt-1" /><div><strong>Methodology:</strong> {project.methodology}</div></li>
            <li className="flex items-start gap-3"><CalendarDays className="w-5 h-5 text-green-600 mt-1" /><div><strong>Issuance Year:</strong> {project.vintageYear}</div></li>
            <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-600 mt-1" /><div><strong>Retired:</strong> {project.retired ? "Yes" : "No"}</div></li>
            <li className="flex items-start gap-3"><Globe2 className="w-5 h-5 text-green-600 mt-1" /><div><strong>Registry:</strong> <a href={project.registryLink} className="text-blue-600 underline" target="_blank" rel="noreferrer">View Registry</a></div></li>
            <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-green-600 mt-1" /><div><strong>Location:</strong> {project.placeName}, {project.city}, {project.state}, {project.country}</div></li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-green-700 flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-600" />
              Carbon Credit Summary
            </h3>
            <div className="mt-6 space-y-4 text-gray-800 text-base sm:text-lg">
              <div className="flex justify-between border-b pb-2"><span className="text-gray-600 font-medium">💰 Price per Ton</span><span className="font-bold text-green-800">{formatRupees(project.pricePerTon)}</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-gray-600 font-medium">📦 Total Tons Available</span><span>{project.tons}</span></div>
              <div className="flex justify-between"><span className="text-gray-600 font-medium">🧾 Total Project Cost</span><span className="text-green-900 font-semibold">{formatRupees(project.totalPrice)}</span></div>
            </div>
          </div>
          <div className="text-sm text-gray-600 italic text-center mt-4">
            Small actions create big change. Offset your carbon footprint today 🌱
          </div>
        </div>
      </section>

      {project.sdgs?.length > 0 && (
        <section className="w-full px-6 sm:px-12 py-14 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-green-700 mb-8">
              Sustainable Development Goals (SDGs)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {project.sdgs.map((goal, idx) => (
                <div key={idx} className="bg-white border border-green-100 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200">
                  <p className="text-sm sm:text-base font-medium text-gray-700 leading-snug text-center">
                    {goal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.additionalNotes && (
        <section className="w-full px-6 sm:px-12 py-10 bg-white border-t border-gray-200">
          <h3 className="text-xl font-semibold text-green-700 mb-4">Additional Notes</h3>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {project.additionalNotes}
          </p>
        </section>
      )}

      <section className="w-full py-16 px-6 sm:px-12 bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug">
            Ready to make an impact?
          </h2>
          <p className="text-base sm:text-lg mb-6 text-white/90">
            Support this verified project and contribute to a greener, more sustainable planet.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleBuyClick}
              className="inline-flex items-center gap-2 bg-white text-green-700 hover:bg-green-100 font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg"
            >
              <Leaf className="w-5 h-5" /> Buy Carbon Credit
            </button>
            <button
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/20 font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg"
            >
              <Phone className="w-5 h-5" /> Contact Us
            </button>
          </div>
          <p className="text-sm text-white/80 mt-4">
            Your purchase supports environmental restoration and aligns with global sustainability goals.
          </p>
        </div>
      </section>

    </div>
  );
};

export default SingleProject;