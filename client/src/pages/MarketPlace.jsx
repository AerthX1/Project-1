
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { FaEnvelope, FaLeaf, FaMapMarkerAlt } from "react-icons/fa";

const Marketplace = () => {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterCat, setFilterCat] = useState("All");
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({ total: 0, avgPrice: 0 });

  useEffect(() => {
    async function fetchProj() {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/projects/marketplace`);
        setProjects(data);
      } catch (e) {
        console.error("fetch error", e);
      }
    }
    fetchProj();
  }, []);

  useEffect(() => {
    const sel = projects.filter(p => 
      (filterCat === "All" || p.category === filterCat) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(sel);
    setStats({
      total: sel.length,
      avgPrice: sel.reduce((a, c) => a + c.price, 0) / (sel.length || 1),
    });
  }, [projects, filterCat, search]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-green-700">🌱 Aearthex Marketplace</h1>
        <p className="text-gray-600 mt-2">Discover & contact carbon credit sellers instantly</p>
      </header>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          className="px-4 py-2 border rounded-lg w-full md:w-1/3"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-lg"
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
        >
          {["All", "Forestry", "Renewable", "Waste", "Cookstoves"].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div className="text-gray-700">
          Total: <strong>{stats.total}</strong> &middot; Avg Price: <strong>₹{stats.avgPrice.toFixed(0)}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(project => (
          <div key={project._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-relative group relative overflow-hidden">
            <div className="p-5 space-y-1">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FaLeaf className="text-green-600"/> {project.name}
              </h3>
              <div className="text-gray-500 text-sm flex items-center gap-1">
                <FaMapMarkerAlt /> {project.location}
              </div>
              <div className="mt-1 text-sm">Category: {project.category}</div>
              <div className="text-lg font-bold mt-2">₹{project.price} / credit</div>
              <div className={`mt-1 text-sm font-medium ${project.available ? 'text-green-500' : 'text-red-500'}`}>
                {project.available ? 'Available' : 'Unavailable'}
              </div>
            </div>

            <div className="h-36 px-4 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={project.salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <a
              href={`mailto:${project.contactEmail}`}
              className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform group-hover:-translate-y-1 transition bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm"
            >
              <FaEnvelope /> Contact Seller
            </a>
          </div>
        ))}
      </div>

      <footer className="text-center text-gray-400 mt-12">
        © 2025 Aearthex Marketplace · Live data from our eco-partners
      </footer>
    </div>
  );
};

export default Marketplace;
