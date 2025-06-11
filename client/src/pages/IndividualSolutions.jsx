import React from "react";
import { Link } from "react-router-dom";
// import IndividualImage from "../assets/individual.jpg"; 

const IndividualSolutions = () => {
  return (
    <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto text-gray-800 space-y-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700">For Individuals</h1>
        <p className="mt-2 text-base text-gray-600 max-w-2xl mx-auto">
          Take responsibility for your personal carbon footprint with easy, affordable, and shareable tools.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-3">Offset Your Emissions in Minutes</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Flight, energy, and lifestyle calculators</li>
            <li>Pay-per-use or subscribe monthly</li>
            <li>Trusted project-backed credits</li>
          </ul>
        </div>
        {/* <img src={IndividualImage} alt="Calculator" className="rounded-lg shadow-lg" /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* <img src={IndividualImage} alt="Progress Tracker" className="rounded-lg shadow-lg" /> */}
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-3">Track Your Progress</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Monthly footprint reports</li>
            <li>Challenges and eco-tips</li>
            <li>Track lifestyle habits</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-3">Show the World You Care</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Offset Certificate NFTs</li>
            <li>Public profiles for individual actions</li>
            <li>Leaderboard coming soon!</li>
          </ul>
        </div>
        {/* <img src={IndividualImage} alt="Certificate NFT" className="rounded-lg shadow-lg" /> */}
      </div>

      <div className="text-center pt-8">
        <h3 className="text-2xl font-semibold text-green-700">Start Offsetting Today</h3>
        <Link
          to="/pricing"
          className="mt-4 inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          View Individual Plans
        </Link>
      </div>
    </div>
  );
};

export default IndividualSolutions;