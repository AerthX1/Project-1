  import React, { useState } from "react";
  import OrganizationRegisterForm from "./OrganizationRegisterForm";
  import IndividualRegisterForm from "./IndividualRegisterForm";

  const RegisterChoice = () => {
    const [isIndividual, setIsIndividual] = useState(false);

    return (
      <div className="w-screen h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 overflow-hidden">
        <div className="relative w-full h-full bg-white shadow-2xl overflow-hidden">

          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-green-700 via-green-900 to-black text-white p-10 flex flex-col justify-center items-center transition-all duration-700 z-20 ${
              isIndividual ? "translate-x-full" : ""
            }`}
          >
            <h2 className="text-4xl font-extrabold mb-4 text-center">
              {isIndividual ? "Already Registered?" : "New Here?"}
            </h2>
            <p className="mb-6 text-center text-lg max-w-md">
              {isIndividual
                ? "Switch back to register as an organization and manage your team."
                : "Register as an individual to join the carbon offsetting journey."}
            </p>
            <button
              onClick={() => setIsIndividual(!isIndividual)}
              className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-gray-100 transition-all"
            >
              {isIndividual ? "Register as Organization" : "Register as Individual"}
            </button>
          </div>

          <div
            className={`absolute top-0 left-0 w-[200%] h-full flex transition-transform duration-700 z-10 ${
              isIndividual ? "-translate-x-1/2" : "translate-x-0"
            }`}
          >
            <div className="w-1/2 ml-96  h-full flex justify-center items-center bg-white">
              <div className="w-full ml-96  max-w-2xl py-10">
                <OrganizationRegisterForm />
              </div>
            </div>

            <div className="w-1/2 mr-96  h-full flex justify-center items-center bg-white">
              <div className="w-full mr-96 max-w-2xl px-10">
                <IndividualRegisterForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default RegisterChoice;
