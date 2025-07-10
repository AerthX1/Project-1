import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading project...</div>;
  if (!project) return <div className="text-center mt-10 text-red-500">Project not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
        <img
          src={`http://localhost:5000${project.image}`}
          alt={project.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-2">{project.title}</h1>
          <p className="text-sm text-gray-500 mb-4">Verified by: {project.verifiedBy}</p>
          <p className="text-lg text-gray-800 mb-4">{project.info}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <p><span className="font-semibold">Price per Ton:</span> ${project.pricePerTon}</p>
              <p><span className="font-semibold">Total Tons:</span> {project.tons}</p>
              <p><span className="font-semibold">Total Price:</span> ${project.totalPrice}</p>
            </div>
            <div>
              <p><span className="font-semibold">Country:</span> {project.country}</p>
              <p><span className="font-semibold">Place:</span> {project.placeName}, {project.city}, {project.state}</p>
              <p><span className="font-semibold">Category:</span> {project.category}</p>
              <p><span className="font-semibold">Project Type:</span> {project.projectType}</p>
            </div>
          </div>

          <div className="mb-4">
            <p><span className="font-semibold">Methodology:</span> {project.methodology}</p>
            <p><span className="font-semibold">Project Duration:</span> {project.projectDuration}</p>
            <p><span className="font-semibold">Vintage:</span> {project.vintage} ({project.vintageYear})</p>
            <p><span className="font-semibold">Retired:</span> {project.retired ? "Yes" : "No"}</p>
            <p><span className="font-semibold">Registry Link:</span> <a href={project.registryLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{project.registryLink}</a></p>
          </div>

          {project.sdgs?.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold mb-1">Sustainable Development Goals (SDGs):</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {project.sdgs.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>
          )}

          {project.additionalNotes && (
            <div className="mt-6 text-sm text-gray-600">
              <p className="font-semibold">Additional Notes:</p>
              <p>{project.additionalNotes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
