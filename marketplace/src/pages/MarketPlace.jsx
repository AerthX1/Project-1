import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MarketPlace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedVintage, setSelectedVintage] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API}/carbon-credits`);
        const sorted = res.data.sort((a, b) => b.pricePerTon - a.pricePerTon);
        setProjects(sorted);
      } catch (err) {
        console.error("❌ Error fetching projects:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory ? project.category?.toLowerCase() === selectedCategory.toLowerCase() : true;
    const matchesPlace = selectedPlace ? project.country?.toLowerCase() === selectedPlace.toLowerCase() : true;
    const matchesVintage = selectedVintage ? String(project.vintage) === selectedVintage : true;

    let matchesPrice = true;
    if (priceRange === "low") matchesPrice = project.pricePerTon < 10;
    else if (priceRange === "mid") matchesPrice = project.pricePerTon >= 10 && project.pricePerTon <= 30;
    else if (priceRange === "high") matchesPrice = project.pricePerTon > 30;

    return matchesSearch && matchesCategory && matchesPlace && matchesVintage && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🌱 AerthX Marketplace</h1>
          <p className="text-sm text-gray-500">Support trusted carbon offset projects</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-6">
          <input
            type="text"
            placeholder="🔍 Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-2/3 px-5 py-3 bg-white rounded-full text-sm shadow-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="px-5 py-2 bg-green-100 text-green-700 text-sm rounded-full font-medium hover:bg-green-200 transition"
          >
            {filterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {filterOpen && (
          <div className="bg-white rounded-xl shadow-md px-6 py-5 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-100 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Categories</option>
                  <option value="energy">Energy</option>
                  <option value="reforestation">Reforestation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Place Name</label>
                <select
                  value={selectedPlace}
                  onChange={(e) => setSelectedPlace(e.target.value)}
                  className="w-full bg-gray-100 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Places</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="amazon">Amazon Forest</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Vintage</label>
                <select
                  value={selectedVintage}
                  onChange={(e) => setSelectedVintage(e.target.value)}
                  className="w-full bg-gray-100 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Any Year</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-gray-100 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Prices</option>
                  <option value="low">Low (Below $10)</option>
                  <option value="mid">Mid ($10 - $30)</option>
                  <option value="high">High (Above $30)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {(searchTerm || selectedCategory || selectedPlace || selectedVintage || priceRange) && (
          <div className="text-sm text-gray-600 mb-4">
            Showing results for:
            <span className="font-medium text-gray-800 mx-1">{searchTerm || 'All'}</span>
            {selectedCategory && <span className="mx-1">| Category: {selectedCategory}</span>}
            {selectedPlace && <span className="mx-1">| Place: {selectedPlace}</span>}
            {selectedVintage && <span className="mx-1">| Vintage: {selectedVintage}</span>}
            {priceRange && <span className="mx-1">| Price: {priceRange}</span>}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center text-gray-400 text-sm mt-10">No projects to display.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center">
            {filteredProjects.map(project => (
              <Link
                to={`/project/${project._id}`}
                key={project._id}
                className="bg-white w-[300px] mx-auto rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-2xl hover:border-green-400 hover:scale-[1.03] transition-all duration-300 ease-in-out block"
              >
                <img
                  src={`http://localhost:5000${project.image}`}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col justify-between">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-green-700">${project.pricePerTon?.toFixed(2)}</h3>
                    <h4 className="text-md font-bold text-gray-800 truncate mt-1">{project.title}</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">{project.info}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.country && (
                      <span className="bg-gray-100 px-3 py-1 text-xs rounded-full text-gray-700 border">{project.country}</span>
                    )}
                    {project.category && (
                      <span className="bg-gray-100 px-3 py-1 text-xs rounded-full text-blue-700 border border-blue-200">🌿 {project.category}</span>
                    )}
                    {project.vintage && (
                      <span className="bg-gray-100 px-3 py-1 text-xs rounded-full text-gray-700 border">{project.vintage}</span>
                    )}
                    {project.sdgs?.length > 0 && (
                      <span className="bg-green-50 px-3 py-1 text-xs rounded-full text-green-700 border border-green-200">🌍 {project.sdgs.length} SDGs</span>
                    )}
                  </div> 
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
