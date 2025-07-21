import React, { useEffect, useState } from "react";
import starterVideo from "../assets/introfirstvideo.mp4";
import graph from "../assets/graph.jpg";
import comming from "../assets/comming-soon.png";
import goldstandard from "../assets/gold-standard.png";
import verra from "../assets/Verra-Logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {

  const [totalTons, setTotalTons] = useState(0);

useEffect(() => {
  const fetchTotalTons = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/carbon-credits/total-tons`);
      setTotalTons(res.data.totalTons || 0);
    } catch (error) {
      console.error("Error fetching total tons:", error.message);
    }
  };

  fetchTotalTons();
}, []);
  return (
    <div className="flex flex-col items-center text-center w-full">
      <section className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src={starterVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="bg-opacity-40 p-6 rounded z-10">
          <h1 className="text-white text-3xl md:text-5xl  font-bold mb-32 hover:text-emerald-300">
            Empowering Businesses to Go Carbon Neutral
          </h1>
          <Link to="/marketplace"className="mt-20 inline-block bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-3 px-14 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 border-2 border-green-700"
          >
           Buy Credits
          </Link>

        </div>
      </section>


      <section className="py-12 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">Why Choose Aearthx ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-20">
          <div className="bg-gray-50 hover:bg-gray-100 p-6 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Verified Projects</h3>
            <p>All our carbon credits come from rigorously verified and certified projects — ensuring real, measurable climate impact.</p>
          </div>
          <div className="bg-gray-50 hover:bg-gray-100 p-6 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Blockchain Transparency (Upcoming)</h3>
            <p>Every carbon credit is securely recorded on the blockchain, making each transaction transparent and tamper-proof.</p>
          </div>
          <div className="bg-gray-50 hover:bg-gray-100 p-6 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Instant Reporting</h3>
            <p>Get real-time reports to track your carbon credits, offsets, and environmental progress — perfect for audits and ESG goals.</p>
          </div>
        </div>
      </section>

        <section className="py-32 bg-[#0a0d0f] text-white w-full text-center flex justify-evenly items-center px-4  md:px-20">
       <div className="flex flex-col items-center ">
         <h2 className="text-4xl font-bold mb-4">Live Carbon Credits Available</h2>
      <p className="text-4xl font-bold text-green-500">
  {totalTons.toLocaleString()} <span className="text-white text-2xl">Tons CO2</span>
</p>

        <div className="mt-8 space-x-4">
          <Link to='/marketplace' className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded">Buy Credits</Link>
          <button className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded">Track Usage</button>
        </div>
         </div>
        <div className="mt-6 max-w-md">
          <img src={graph} alt="graph image" />
        </div>
      
      </section>

      <section className="py-12 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-20">
          {['Explore Projects', 'Buy Credits', 'Tokenization & Ownership (Upcoming)', 'Track & Download'].map((title, i) => (
            <div key={i} className="bg-gray-50  hover:bg-gray-100 p-4 rounded shadow text-center">
              <p className="font-semibold text-lg">{title}</p>
              <p className="mt-2 text-sm text-gray-700">
                {i === 0 && 'Browse and choose a certified project'}
                {i === 1 && 'Buy credits linked to your selected project.'}
                {i === 2 && 'Credits are recorded on blockchain and transferred to your wallet.'}
                {i === 3 && 'Monitor on-chain and download your ESG certificate.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">Who We Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-20">
          <div className="bg-white  hover:bg-gray-100 p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Corporates & Enterprises</h3>
            <p>Use your carbon actions to meet ESG goals and strengthen your brand image.</p>
          </div>
          <div className="bg-white  hover:bg-gray-100 p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">E-Commerce & Startups</h3>
            <p>Integrate carbon offsetting directly into your product delivery.</p>
          </div>
          <div className="bg-white  hover:bg-gray-100 p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Individuals & Freelancers</h3>
            <p>Track and offset personal emissions such as flights, electricity, and more.</p>
          </div>
          <div className="bg-white  hover:bg-gray-100 p-4 rounded shadow">
            <h3 className="font-semibold text-lg mb-2">Educational Institutions & NGOs</h3>
            <p>Promote sustainability and educate communities with real environmental action.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white w-full text-center">
        <p className="text-lg max-w-2xl mx-auto mb-6">
          We source certified carbon credits from globally recognized registries ensuring environmental integrity and transparency.
        </p>
        <div className="flex justify-center items-center space-x-20">
          <img src={verra} alt="Verra" className="h-25" />
          <img src={goldstandard} alt="Gold Standard" className="h-25" />
          <img src={comming} alt="Coming Soon" className="h-25 opacity-60" />
        </div>
      </section>
        <section className="bg-green-500 w-full text-white py-12 px-4 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Ready to Offset Your Carbon Footprint?
      </h2>
      <p className="text-sm sm:text-base md:text-lg mb-6 max-w-2xl mx-auto">
        Join businesses making a difference. Start your climate-positive journey with Aearthex today.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="border border-white font-semibold py-2 px-6 rounded-md hover:bg-white hover:text-green-600 transition">
          View Pricing Plans
        </button>
        <button className="border border-white font-semibold py-2 px-6 rounded-md hover:bg-white hover:text-green-600 transition">
          Contact Us
        </button>
      </div>
    </section>
    </div>
  );
}

