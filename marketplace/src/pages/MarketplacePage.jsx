import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";

const MarketplacePage = () => {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [highestPricedProject, setHighestPricedProject] = useState(null);
  const [dailySuggestions, setDailySuggestions] = useState([]);
  const [lowestPricedProjects, setLowestPricedProjects] = useState([]);
  const API = import.meta.env.VITE_API_URL;

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/carbon-credits`);
      const allProjects = res.data;

      const filtered = allProjects
        .filter((p) => String(p.vintage).trim() === "2024")
        .sort((a, b) => b.vintage - a.vintage);

      setProjects(filtered.slice(0, 5));

      const mostExpensive = allProjects.reduce(
        (max, curr) =>
          curr.pricePerTon > (max?.pricePerTon || 0) ? curr : max,
        null
      );
      setHighestPricedProject(mostExpensive);

      const seed = new Date().toISOString().split("T")[0];
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
      }
      const shuffled = [...allProjects].sort((a, b) => {
        return ((hash * a._id.length) % 1000) - ((hash * b._id.length) % 1000);
      });
      setDailySuggestions(shuffled.slice(0, 4));

      const sortedByPrice = [...allProjects]
        .filter((p) => p.pricePerTon)
        .sort((a, b) => a.pricePerTon - b.pricePerTon);

      setLowestPricedProjects(sortedByPrice.slice(0, 4));
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  };

  fetchData();
}, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  if (!projects.length) return null;

  const current = projects[currentIndex];

  return (
    <div className="w-full">
      <div className="relative w-full h-[900px] sm:h-[700px] overflow-hidden shadow-lg">
  <img
    src={`http://localhost:5000${current.backgroundImage || current.image}`}
    alt={current.title}
    className="w-full h-full object-cover absolute inset-0"
  />


        <div className="absolute inset-0 bg-black/50 z-0" />

        <div className="absolute top-1/2 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-10 transform -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/20 hover:bg-white/40 hover:scale-125 transition-all duration-300"
          >
            <ArrowLeft className="text-white w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/20 hover:bg-white/40 hover:scale-125 transition-all duration-300"
          >
            <ArrowRight className="text-white w-6 h-6" />
          </button>
        </div>

        <div className="absolute bottom-6 sm:bottom-10 left-8 sm:left-20 z-20 text-white max-w-md sm:max-w-lg">
          <div className="rounded-xl p-5 sm:p-6 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight text-white drop-shadow">
              {current.title}
            </h2>

            <p className="text-sm sm:text-base line-clamp-3 mb-3 text-gray-100 leading-relaxed drop-shadow">
              {current.info}
            </p>

            <div className="text-sm sm:text-base font-medium space-y-1 mb-4">
              <p className="text-green-300">
                💰 ${current.pricePerTon?.toFixed(2)} / Ton
              </p>
              <p className="text-gray-200">📅 Vintage: {current.vintage}</p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/marketplace"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-full text-sm font-semibold shadow transition"
              >
                Explore More
              </Link>
              <Link
                to={`/project/${current._id}`}
                className="bg-white hover:bg-gray-100 text-green-700 py-2 px-5 rounded-full text-sm font-semibold shadow transition"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {highestPricedProject && (
        <div className="mt-12 w-full bg-green-50 rounded-xl shadow-lg flex flex-col sm:flex-row overflow-hidden px-6 sm:px-12 py-6">
          <div className="sm:w-1/2 p-3">
            <img
              src={`http://localhost:5000${
                highestPricedProject.backgroundImage ||
                highestPricedProject.image
              }`}
              alt={highestPricedProject.title}
              className="w-10/12 h-80 object-cover rounded-md shadow"
            />
          </div>

          <div className="sm:w-1/2 p-6 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-widest text-green-600 font-semibold mb-3">
              🔥 Premium Carbon Credit Project
            </span>

            <h2 className="text-3xl font-extrabold text-green-800 mb-3 leading-tight">
              {highestPricedProject.title}
            </h2>

            <p className="text-base text-gray-700 mb-4 leading-relaxed tracking-wide">
              {highestPricedProject.info?.slice(0, 160)}...
            </p>

            <p className="text-lg font-medium text-green-700 mb-6">
              💰 Price per Metric Ton:{" "}
              <span className="font-bold">
                ${highestPricedProject.pricePerTon?.toFixed(2)}
              </span>
            </p>

            <Link
              to={`/project/${highestPricedProject._id}`}
              className="inline-block bg-green-600 hover:bg-green-700 hover:scale-105 transform transition-transform duration-300 text-white py-2 px-6 rounded-full text-sm font-semibold shadow-md w-44 text-center"
            >
              View Details
            </Link>
          </div>
        </div>
      )}

     {dailySuggestions.length > 0 && (
  <div className="mt-16 px-6 sm:px-12">
    <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6">
      🌱 Our Suggestions Today
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {dailySuggestions.map((project) => (
        <Link
          to={`/project/${project._id}`}
          key={project._id}
          className="rounded-xl shadow-lg overflow-hidden relative group h-64 sm:h-72"
        >
          <img
            src={`http://localhost:5000${
              project.backgroundImage || project.image
            }`}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" />
          <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h3 className="text-lg font-semibold truncate">
              {project.title}
            </h3>
            <p className="text-green-300 mt-1 font-medium">
              💰 ${project.pricePerTon?.toFixed(2)} / Ton
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}
{lowestPricedProjects.length > 0 && (
  <div className="mt-16 px-6 sm:px-12">
    <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6">
      💸 Most Affordable Projects
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {lowestPricedProjects.map((project) => (
        <Link
          to={`/project/${project._id}`}
          key={project._id}
          className="rounded-xl shadow-md hover:shadow-xl overflow-hidden relative group h-64 sm:h-72"
        >
          <img
            src={`http://localhost:5000${
              project.backgroundImage || project.image
            }`}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" />
          <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h3 className="text-lg font-semibold truncate">{project.title}</h3>
            <p className="text-green-300 mt-1 font-medium">
              💰 ${project.pricePerTon?.toFixed(2)} / Ton
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default MarketplacePage;
