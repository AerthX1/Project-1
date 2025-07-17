import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
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
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!project) return <div className="text-center mt-10 text-red-500">Project not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Payment Summary</h2>
        <p className="mb-2"><span className="font-semibold">Project:</span> {project.title}</p>
        <p className="mb-2"><span className="font-semibold">Price per Ton:</span> ${project.pricePerTon}</p>
        <p className="mb-2"><span className="font-semibold">Tons:</span> {project.tons}</p>
        <p className="mb-4"><span className="font-semibold">Total:</span> ${project.totalPrice}</p>

        <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
