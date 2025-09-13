import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaDiscord,
  FaBug,
  FaRegQuestionCircle,
  FaExclamationTriangle,
  FaWhatsapp,
  FaGlobe,
} from "react-icons/fa";
import axios from "axios";

const AccordionItem = ({ faq, index, openIndex, setOpenIndex }) => {
  const isOpen = openIndex === index;
  return (
    <div className="border rounded-xl overflow-hidden transition-all duration-300 shadow hover:shadow-xl bg-white">
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full flex justify-between items-center p-5 hover:bg-indigo-100 transition-colors duration-200"
      >
        <span className="text-left font-semibold text-gray-800 text-lg">{faq.question}</span>
        <span className="text-indigo-600 text-2xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="p-5 text-gray-600 bg-gray-50 border-t text-base leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
};

const HelpSupport = ({ user }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ title: [], description: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

useEffect(() => {
  const fetchFaqs = async () => { 
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/faqs`);
      if (res.data.success) {
        const supportFaqs = res.data.faqs.filter(f => f.category === "support");
        setFaqs(supportFaqs);
        const uniqueCategories = ["All", ...new Set(supportFaqs.map(f => f.category))];
        setCategories(uniqueCategories);
      }
    } catch (err) {
      console.error("Error fetching FAQs:", err);
    }
  };
  fetchFaqs();
}, []);


  const filteredFaqs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (type) => {
    setFormData((prev) => {
      if (prev.title.includes(type)) {
        return { ...prev, title: prev.title.filter((t) => t !== type) };
      } else {
        return { ...prev, title: [...prev.title, type] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/bugs`,
        {
          ...formData,
          name: user?.name || "Anonymous",
          userType: user?.userType || "Guest",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setSuccess("Bug report submitted successfully!");
      setFormData({ title: [], description: "" });
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      setSuccess("Error submitting bug report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 flex justify-center items-center gap-4">
          <FaRegQuestionCircle className="text-indigo-600" /> Help & Support
        </h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
          Find answers to your questions, report issues, and learn how to get the most from Aerthx.
        </p>
      </div>

      <div className="bg-yellow-100 text-yellow-900 border-l-4 border-yellow-400 p-5 rounded-xl flex items-center gap-4 mb-12 shadow-md">
        <FaExclamationTriangle className="text-yellow-600 text-2xl" />
        <p className="font-medium">
          <strong>Notice:</strong> Some users may experience slower processing during high traffic. Please be patient or try again shortly.
        </p>
      </div>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Frequently Asked Questions</h2>

        <div className="space-y-5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={faq._id}
                index={index}
                faq={faq}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            ))
          ) : (
            <p className="text-gray-500">No FAQs available for this category.</p>
          )}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <FaEnvelope className="text-indigo-600 text-3xl mb-3" />, title: "Email Us", desc: "support@aerthx.com", href: "mailto:support@aearthex.com" },
            { icon: <FaPhone className="text-indigo-600 text-3xl mb-3" />, title: "Call Support", desc: "+91 98765 43210", extra: "(Mon–Fri, 9AM–6PM IST)" },
            { icon: <FaDiscord className="text-indigo-600 text-3xl mb-3" />, title: "Join Discord", desc: "Community Chat", href: "https://discord.gg/aerthx" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border hover:shadow-xl transition-all duration-300 text-center">
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
              {item.href ? <a href={item.href} className="text-indigo-700 underline hover:text-indigo-900 text-sm">{item.desc}</a> : <p className="text-gray-700 text-sm">{item.desc}</p>}
              {item.extra && <p className="text-xs text-gray-400 mt-1">{item.extra}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">User Guides & Resources</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Getting Started with AerthX", desc: "Learn how to set up your account, explore projects, and make your first purchase.", href: "/docs/getting-started" },
            { title: "Subscription Plans", desc: "Compare Basic, Pro, and Enterprise plans and choose the best fit for your needs.", href: "/pricing" },
            { title: "Certificate Process", desc: "Understand how certificates are generated, where to find them, and how to verify them.", href: "/docs/certificates" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border hover:shadow-xl transition duration-300 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.desc}</p>
              <a href={item.href} className="text-indigo-700 font-medium underline hover:text-indigo-900">Read More →</a>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <div className="w-full max-w-5xl mx-auto bg-red-50 border border-red-200 rounded-3xl shadow-2xl p-12 relative overflow-hidden">
          <div className="absolute -top-28 -right-28 w-96 h-96 bg-red-200 rounded-full opacity-20 mix-blend-multiply animate-pulse"></div>
          <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-red-300 rounded-full opacity-15 mix-blend-multiply animate-pulse"></div>

          <h2 className="text-4xl font-extrabold text-red-700 mb-4 flex justify-center items-center gap-3">
            <FaBug className="text-red-600 text-5xl" /> Report a Bug
          </h2>
          <p className="text-gray-700 mb-8 text-center text-lg max-w-3xl mx-auto">
            Facing an issue on Aerthx? Share the details below and our team will fix it as soon as possible.
          </p>

          <div className="text-center mb-10">
            <button
              onClick={() => { setIsOpen(true); setSuccess(""); setFormData({ title: [], description: "" }); }}
              className="px-10 py-4 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-105"
            >
              <Link to="/report-bug">Submit a Bug Report</Link>
            </button>
          </div>
        </div>
      </section>

      <footer className="text-center text-gray-600 mt-24">
        <p className="mb-4 text-base">Review our legal policies:</p>
        <div className="flex flex-wrap justify-center gap-8 text-indigo-700 font-semibold">
          <a href="/privacy-policy" className="underline hover:text-indigo-900 transition">Privacy Policy</a>
          <a href="/terms-of-service" className="underline hover:text-indigo-900 transition">Terms of Service</a>
          <a href="/refund-policy" className="underline hover:text-indigo-900 transition">Refund Policy</a>
        </div>
        <p className="mt-6 text-sm text-gray-400">© {new Date().getFullYear()} AerthX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HelpSupport;
