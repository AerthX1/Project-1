import React from "react";
import { Link } from "react-router-dom";
import { FaBuilding, FaUser, FaCode, FaCheckCircle, FaStar, FaHandshake } from "react-icons/fa";

const Solutions = () => {
  return (
    <div className="relative overflow-hidden bg-gray-50 py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-60"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Our <span className="text-green-600">Solutions</span>
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-600 sm:mt-5 sm:text-xl lg:mx-auto">
            Explore our curated suite of carbon offset services, designed to empower everyone from individuals to global enterprises.
          </p>
        </div>

        <div className="-mx-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          <section className="group transform rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <FaBuilding size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-green-600">For Businesses</h2>
            </div>
            <p className="mt-5 text-gray-600">
              Deliver on your sustainability goals with scalable carbon credit solutions, real-time ESG dashboards, and dedicated API access for seamless integration.
            </p>
            <Link
              to="/solutions/business"
              className="mt-6 inline-block rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition duration-300 hover:bg-green-700 hover:shadow-xl"
            >
              Discover More &rarr;
            </Link>
          </section>

          <section className="group transform rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <FaUser size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-green-600">For Individuals</h2>
            </div>
            <p className="mt-5 text-gray-600">
              Offset your personal carbon footprint, track your environmental impact, and receive verified certificates to share your journey.
            </p>
            <Link
              to="/solutions/individuals"
              className=" mt-11 inline-block rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition duration-300 hover:bg-green-700 hover:shadow-xl"
            >
              Discover More &rarr;
            </Link>
          </section>
{/* 
          <section className="group transform rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <FaCode size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-green-600">API & Integration</h2>
            </div>
            <p className="mt-5 text-gray-600">
              Integrate sustainability directly into your product. Our robust developer APIs and customizable widgets make managing enterprise impact effortless.
            </p>
            <Link
              to="/solutions/api"
              className="mt-6 inline-block rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition duration-300 hover:bg-green-700 hover:shadow-xl"
            >
              Discover More &rarr;
            </Link>
          </section> */}
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mt-4 text-lg text-gray-600 lg:mx-auto">
            Our commitment to transparency, innovation, and impact sets us apart.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                <FaCheckCircle size={24} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Verified Impact</h3>
              <p className="mt-2 text-gray-600">
                All our projects are meticulously vetted and verified to ensure real, measurable carbon reduction.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
                <FaStar size={24} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Seamless Experience</h3>
              <p className="mt-2 text-gray-600">
                Our user-friendly platform and powerful APIs make offsetting your footprint incredibly easy.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-500">
                <FaHandshake size={24} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Dedicated Support</h3>
              <p className="mt-2 text-gray-600">
                We're here to help. Our team provides expert guidance to meet your unique sustainability goals.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 rounded-3xl bg-green-700 p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Make a Difference?
          </h2>
          <p className="mt-4 max-w-2xl text-lg opacity-80 lg:mx-auto">
            Join the movement toward a sustainable future. Explore our carbon offset solutions today.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/contactus"
              className="rounded-full bg-white px-8 py-3 text-sm font-medium text-green-700 shadow-lg transition duration-300 hover:bg-gray-100"
            >
              Get in Touch
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-white px-8 py-3 text-sm font-medium text-white transition duration-300 hover:bg-white hover:text-green-700"
            >
              Learn About Our Mission
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;