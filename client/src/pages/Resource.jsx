import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaBookOpen, FaLightbulb, FaUsers, FaPenNib, FaGraduationCap } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

const BlogPostCard = ({ title, description, link, isLarge = false }) => (
  <div className={`rounded-2xl bg-white shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden ${isLarge ? 'md:col-span-2' : ''}`}>
    <div className={`w-full ${isLarge ? 'h-64' : 'h-48'} bg-green-200`}>
      <div className="w-full h-full bg-gradient-to-br from-green-300 to-green-400 opacity-60"></div>
    </div>
    <div className="p-4 sm:p-5 md:p-6">
      <h3 className={`font-bold text-green-800 mb-2 ${isLarge ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl'}`}>{title}</h3>
      <p className={`text-gray-600 mb-4 ${isLarge ? 'text-base' : 'text-sm'}`}>{description}</p>
      <Link to={link} className="inline-block font-medium text-green-700 underline hover:text-green-900">
        Read More
      </Link>
    </div>
  </div>
);

const ImpactStoryCard = ({ title, description, link }) => (
  <Link to={link} className="rounded-2xl bg-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl group block">
    <div className="h-48 w-full bg-green-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20"></div>
      <div className="p-6 absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0 translate-y-full">
        <h3 className="font-bold text-lg mb-1 text-green-800">{title}</h3>
        <p className="text-sm text-green-600">Read Story</p>
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-bold text-lg mb-2 text-green-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <span className="mt-4 inline-block font-medium text-green-700 underline hover:text-green-900">
        Read Story
      </span>
    </div>
  </Link>
);

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b border-gray-200 last:border-none">
    <button
      onClick={onToggle}
      className="flex justify-between items-center w-full py-5 text-left focus:outline-none transition-colors duration-200 hover:bg-gray-50"
    >
      <span className="text-base sm:text-lg md:text-xl font-medium text-green-800">{question}</span>
      <svg
        className={`w-6 h-6 text-green-600 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? "max-h-96 py-4" : "max-h-0"}`}>
      <p className="text-gray-600 text-base leading-relaxed">{answer}</p>
    </div>
  </div>
);

const Resource = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/faqs`);
        if (res.data.success) {
          setFaqs(res.data.faqs.filter((f) => f.category === "resource"));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <main className="px-4 sm:px-6 md:px-12 lg:px-16 py-10 sm:py-12 md:py-16 w-full font-sans">
      
      <header className="relative py-12 sm:py-16 md:py-24 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl animate-fade-in-down">
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-600 opacity-90"></div>
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 10a1 1 0 11-2 0 1 1 0 012 0zm-4 0a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0zm-4 4a1 1 0 11-2 0 1 1 0 012 0zm-4 4a1 1 0 11-2 0 1 1 0 012 0zm8 4a1 1 0 11-2 0 1 1 0 012 0zm0-8a1 1 0 11-2 0 1 1 0 012 0zm-4 4a1 1 0 11-2 0 1 1 0 012 0zm0 8a1 1 0 11-2 0 1 1 0 012 0z' fill='%23ffffff' fill-opacity='0.1' /%3E%3C/svg%3E")` }}></div>
        
        <div className="relative text-center text-white space-y-6 z-10 max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-lg font-display">
            Explore AerthX Resources
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed">
            Your comprehensive guide to sustainability, carbon offsetting, and ESG reporting, all in one place.
          </p>
          {!user && (
            <Link
              to="/register-choice"
             className="inline-block px-6 sm:px-8 md:px-12 py-2.5 sm:py-3 md:py-4 bg-white text-green-700 text-sm sm:text-base font-semibold rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
          )}
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 md:space-y-28">
          <section className="animate-fade-in-up mt-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-green-800 mb-6 sm:mb-8 md:mb-10 text-center font-display">Quick Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 text-left">
              <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 bg-green-50 shadow-md transition-all duration-300 hover:shadow-xl group">
                <div className="text-5xl mb-4 text-green-600 transition-transform duration-300 group-hover:scale-110"><FaLeaf /></div>
                <h4 className="font-bold text-2xl mb-2 text-gray-800">Eco Tips</h4>
                <p className="text-base text-gray-600">Practical sustainability actions for individuals and businesses.</p>
              </div>
              <div className="rounded-3xl p-8 bg-green-50 shadow-md transition-all duration-300 hover:shadow-xl group">
                <div className="text-5xl mb-4 text-green-600 transition-transform duration-300 group-hover:scale-110"><FaBookOpen /></div>
                <h4 className="font-bold text-2xl mb-2 text-gray-800">Guides</h4>
                <p className="text-base text-gray-600">Step-by-step instructions on carbon credit management.</p>
              </div>
              <div className="rounded-3xl p-8 bg-green-50 shadow-md transition-all duration-300 hover:shadow-xl group">
                <div className="text-5xl mb-4 text-green-600 transition-transform duration-300 group-hover:scale-110"><FaLightbulb /></div>
                <h4 className="font-bold text-2xl mb-2 text-gray-800">Insights</h4>
                <p className="text-base text-gray-600">Learn about carbon offsetting trends and ESG compliance.</p>
              </div>
              <div className="rounded-3xl p-8 bg-green-50 shadow-md transition-all duration-300 hover:shadow-xl group">
                <div className="text-5xl mb-4 text-green-600 transition-transform duration-300 group-hover:scale-110"><FaUsers /></div>
                <h4 className="font-bold text-2xl mb-2 text-gray-800">Community</h4>
                <p className="text-base text-gray-600">Stories of organizations and communities making a difference.</p>
              </div>
            </div>
          </section>

          <section className="animate-fade-in-up">
            <h2 className="text-4xl font-semibold text-green-800 mb-10 text-center font-display">Latest Blogs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              <BlogPostCard
                title="Understanding Carbon Credits"
                description="Explore the basics of carbon credits and why they matter for sustainability. Get a comprehensive overview of the market and its impact."
                link="/blogs/carbon-credits"
                isLarge={true}
              />
              <div className="md:col-span-1 space-y-8">
                <BlogPostCard
                  title="ESG Trends in 2025"
                  description="Stay updated on the latest ESG reporting trends and compliance strategies that are shaping the industry."
                  link="/blogs/esg-trends"
                />
                <BlogPostCard
                  title="Carbon Offsetting Tips"
                  description="Learn simple, actionable ways individuals and businesses can reduce carbon footprints and support a cleaner planet."
                  link="/blogs/offset-tips"
                />
              </div>
            </div>
          </section>

          <section className="animate-fade-in-up">
            <h2 className="text-4xl font-semibold text-green-800 mb-10 text-center font-display">Guides & Tutorials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
              <Link to="/guides/buying-credits" className="group rounded-2xl p-6 bg-white shadow-md transition-all duration-300 hover:shadow-xl block">
                <div className="text-3xl text-green-600 mb-3 transition-colors duration-300 group-hover:text-green-800"><FaBookOpen /></div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Buying Carbon Credits</h3>
                <p className="text-gray-600 text-sm">Learn how to choose and purchase credits safely and effectively.</p>
                <div className="w-full h-1 bg-green-200 mt-4 rounded-full">
                  <div className="w-0 h-1 bg-green-600 rounded-full transition-[width] duration-500 group-hover:w-full"></div>
                </div>
              </Link>
              <Link to="/guides/dashboard" className="group rounded-2xl p-6 bg-white shadow-md transition-all duration-300 hover:shadow-xl block">
                <div className="text-3xl text-green-600 mb-3 transition-colors duration-300 group-hover:text-green-800"><FaBookOpen /></div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Using AerthX Dashboard</h3>
                <p className="text-gray-600 text-sm">Monitor your carbon footprint, manage subscriptions, and track progress with ease.</p>
                <div className="w-full h-1 bg-green-200 mt-4 rounded-full">
                  <div className="w-0 h-1 bg-green-600 rounded-full transition-[width] duration-500 group-hover:w-full"></div>
                </div>
              </Link>
              <Link to="/guides/offsetting-strategies" className="group rounded-2xl p-6 bg-white shadow-md transition-all duration-300 hover:shadow-xl block">
                <div className="text-3xl text-green-600 mb-3 transition-colors duration-300 group-hover:text-green-800"><FaBookOpen /></div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">Offsetting Strategies</h3>
                <p className="text-gray-600 text-sm">Best practices for individual and organizational carbon offsetting.</p>
                <div className="w-full h-1 bg-green-200 mt-4 rounded-full">
                  <div className="w-0 h-1 bg-green-600 rounded-full transition-[width] duration-500 group-hover:w-full"></div>
                </div>
              </Link>
              <Link to="/guides/esg-reporting" className="group rounded-2xl p-6 bg-white shadow-md transition-all duration-300 hover:shadow-xl block">
                <div className="text-3xl text-green-600 mb-3 transition-colors duration-300 group-hover:text-green-800"><FaBookOpen /></div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">ESG Reporting</h3>
                <p className="text-gray-600 text-sm">Generate and customize reports aligned with industry standards.</p>
                <div className="w-full h-1 bg-green-200 mt-4 rounded-full">
                  <div className="w-0 h-1 bg-green-600 rounded-full transition-[width] duration-500 group-hover:w-full"></div>
                </div>
              </Link>
            </div>
            <div className="text-center mt-12">
              <Link
                to="/guides"
                className="inline-block mt-12 px-12 py-4 bg-green-700 text-white rounded-full shadow-md hover:bg-green-800 transform hover:scale-105 transition-all duration-300 font-medium"
              >
                View All Guides
              </Link>
            </div>
          </section>

          <section className="animate-fade-in-up">
            <h2 className="text-4xl font-semibold text-green-800 mb-10 text-center font-display">Learn About Carbon Credits</h2>
            <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-10 bg-gray-100 shadow-lg sm:shadow-xl overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="w-32 h-32 bg-green-200 rounded-full opacity-30 blur-2xl -top-10 -left-10 animate-blob"></div>
                <div className="w-48 h-48 bg-green-300 rounded-full opacity-20 blur-2xl -bottom-20 -right-20 animate-blob-2"></div>
              </div>
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                <Link to="/educational/what-are-carbon-credits" className="bg-white rounded-2xl p-8 text-center shadow-lg transition-transform duration-300 transform hover:-translate-y-1 block">
                  <div className="text-5xl mb-4 flex justify-center text-green-600"><FaGraduationCap /></div>
                  <h4 className="font-bold text-2xl text-gray-800 mb-2">What Are Carbon Credits?</h4>
                  <p className="text-gray-600 mb-4">A beginner's guide to understanding carbon credits and their impact.</p>
                  <span className="text-green-700 font-medium underline hover:text-green-900">Read More</span>
                </Link>
                <Link to="/educational/why-offset-carbon" className="bg-white rounded-2xl p-8 text-center shadow-lg transition-transform duration-300 transform hover:-translate-y-1 block">
                  <div className="text-5xl mb-4 flex justify-center text-green-600"><FaGraduationCap /></div>
                  <h4 className="font-bold text-2xl text-gray-800 mb-2">Why Offset Carbon?</h4>
                  <p className="text-gray-600 mb-4">Learn why carbon offsetting is critical for sustainability and ESG goals.</p>
                  <span className="text-green-700 font-medium underline hover:text-green-900">Read More</span>
                </Link>
                <Link to="/educational/aerthx-benefits" className="bg-white rounded-2xl p-8 text-center shadow-lg transition-transform duration-300 transform hover:-translate-y-1 block">
                  <div className="text-5xl mb-4 flex justify-center text-green-600"><FaGraduationCap /></div>
                  <h4 className="font-bold text-2xl text-gray-800 mb-2">How AerthX Helps</h4>
                  <p className="text-gray-600 mb-4">Discover how our platform simplifies carbon credit management.</p>
                  <span className="text-green-700 font-medium underline hover:text-green-900">Read More</span>
                </Link>
              </div>
            </div>
          </section>
          
          <section className="animate-fade-in-up">
            <h2 className="text-4xl font-semibold text-green-800 mb-10 text-center font-display">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-5 sm:p-6 md:p-8 divide-y divide-gray-200"  >
              {faqs.length ? (
                faqs.map((faq, i) => (
                  <FAQItem
                    key={faq._id}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center py-6">No FAQs available right now. Please check back later.</p>
              )}
            </div>
          </section>

          <section className="animate-fade-in-up">
            <h2 className="text-4xl font-semibold text-green-800 mb-10 text-center font-display">Impact Stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              <ImpactStoryCard
                title="A Startup's Journey"
                description="How a small business used AerthX to offset over 100 tons of CO₂ and boost its brand."
                link="/stories/startup"
              />
              <ImpactStoryCard
                title="Corporate Sustainability"
                description="Learn how a large enterprise achieved full ESG compliance efficiently with AerthX."
                link="/stories/corporate"
              />
              <ImpactStoryCard
                title="Community Initiatives"
                description="Discover how communities are planting trees and generating carbon credits to fund local projects."
                link="/stories/community"
              />
            </div>
          </section>

          
          {!user && (
            <section className="bg-green-700 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 text-center shadow-xl sm:shadow-2xl animate-fade-in-up">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Make a Real Impact?</h2>
              <p className="mb-8 text-xl text-green-100 max-w-2xl mx-auto">Join AerthX today and take a significant step towards a more sustainable future for your business and the planet.</p>
              <Link
                to="/register-choice"
                className="inline-block px-6 sm:px-10 md:px-14 py-3 sm:py-4 md:py-5 text-sm sm:text-base bg-white text-green-700 font-semibold rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                Create Your Account
              </Link>
            </section>
          )}
      </div>
    </main>
  );
};

export default Resource;