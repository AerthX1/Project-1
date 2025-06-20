import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register as</h2>
      <div className="flex gap-6">
        <button
          onClick={() => navigate("/register")}
          className="px-8 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition"
        >
          Organization
        </button>
        <button
          onClick={() => navigate("/register-individual")}
          className="px-8 py-3 bg-gray-300 text-gray-800 rounded-lg text-lg font-semibold hover:bg-gray-400 transition"
        >
          Individual
        </button>
      </div>
    </div>
  );
};

export default RegisterChoice;