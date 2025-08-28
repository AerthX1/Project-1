import React, { useState } from "react";
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

const faqs = [
  {
    question: "How do I make a purchase?",
    answer:
      "Go to the Marketplace, select a project, and click 'Buy Now'. You can pay using UPI, credit/debit card, or other available methods.",
  },
  {
    question: "Where can I download my certificate?",
    answer:
      "After a successful purchase, visit your Profile → Certificates. Each certificate has a download button.",
  },
  {
    question: "Can I update my profile or email?",
    answer:
      "Yes, go to your Profile and click 'Edit'. After saving, you may be asked to verify your email again.",
  },
  {
    question: "How do I cancel a subscription?",
    answer:
      "Visit your Subscription page. If you're on a paid plan, you'll see the option to cancel or downgrade.",
  },
  {
    question: "What if my transaction fails?",
    answer:
      "If payment was deducted but the process failed, it will be retried automatically. If not resolved in 24 hours, contact support.",
  },
  {
    question: "Do you provide support for bulk purchases?",
    answer:
      "Yes! Reach out via email or phone to request a bulk pricing quote or learn about custom solutions.",
  },
  {
    question: "Is customer support available 24/7?",
    answer:
      "Currently, our live support is available Mon–Fri, 9AM–6PM IST. But you can raise a ticket anytime, and we usually respond within 24 hours.",
  },
  {
    question: "Can I request a personalized certificate?",
    answer:
      "Yes. Contact support with your request. Custom designs are available for Pro and Enterprise users.",
  },
];

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

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ title: [], description: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const bugTypes = [
  "UI Issue",
  "Navigation/Link Issue",
  "Performance/Slow",
  "Mobile/Responsive Issue",
  "Accessibility Issue",

  "Payment Failure",
  "Refund Issue",
  "Transaction History Incorrect",
  "Invoice/Receipt Error",

  "Certificate Error",
  "Certificate Download Issue",
  "Carbon Credit Not Reflected",
  "NFT/Token Metadata Issue",

  "Feature Not Working",
  "Subscription Issue",
  "Marketplace Listing Problem",
  "Wallet/MetaMask Connection Issue",
  "API/Enterprise Dashboard Error",

  "Profile Update Issue",
  "Email Verification Problem",
  "Password Reset Issue",

  "Security/Hacking Concern",

  "Other",
];


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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              index={index}
              faq={faq}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaEnvelope className="text-indigo-600 text-3xl mb-3" />,
              title: "Email Us",
              desc: "support@aerthx.com",
              href: "mailto:support@aerthx.com",
            },
            {
              icon: <FaPhone className="text-indigo-600 text-3xl mb-3" />,
              title: "Call Support",
              desc: "+91 98765 43210",
              extra: "(Mon–Fri, 9AM–6PM IST)",
            },
            {
              icon: <FaDiscord className="text-indigo-600 text-3xl mb-3" />,
              title: "Join Discord",
              desc: "Community Chat",
              href: "https://discord.gg/aerthx",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-indigo-700 underline hover:text-indigo-900 text-sm"
                >
                  {item.desc}
                </a>
              ) : (
                <p className="text-gray-700 text-sm">{item.desc}</p>
              )}
              {item.extra && (
                <p className="text-xs text-gray-400 mt-1">{item.extra}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">More Ways to Reach Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <div className="flex justify-center items-center mb-3">
                  <FaWhatsapp className="text-green-600 text-3xl" />
                </div>
              ),
              label: "WhatsApp",
              link: "https://wa.me/919876543210",
              bg: "bg-green-50",
            },
            {
              icon: (
                <div className="text-3xl font-extrabold text-black mb-3 group-hover:scale-110 transition-transform duration-300">
                  X
                </div>
              ),
              label: "X (formerly Twitter)",
              link: "https://x.com/Aerthx",
              bg: "bg-gray-100 hover:bg-gray-200 transition-colors duration-300 group",
            },
            {
              icon: (
                <div className="flex justify-center items-center mb-3">
                  <FaGlobe className="text-gray-700 text-3xl" />
                </div>
              ),
              label: "Documentation",
              link: "/docs",
              bg: "bg-gray-100",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`${item.bg} p-6 rounded-xl hover:shadow-xl transition duration-300 text-center`}
            >
              {item.icon}
              <p className="text-base font-semibold text-gray-700 mb-1">{item.label}</p>
              <a
                href={item.link}
                className="text-indigo-700 underline hover:text-indigo-900 text-sm"
              >
                Visit
              </a>
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
  onClick={() => {
    setIsOpen(true);           
    setSuccess("");           
    setFormData({ title: [], description: "" }); 
  }}
  className="px-10 py-4 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-105"
>
  Submit a Bug Report
</button>

    </div>

    {isOpen && (
   <div className="fixed inset-0 bg-gradient-to-br from-green-200 via-green-100 to-green-300 bg-opacity-50 backdrop-blur-sm flex justify-center items-start pt-20 z-50 p-4 overflow-y-auto">
  <div className="relative w-full max-w-6xl bg-white bg-opacity-95 backdrop-blur-md rounded-3xl shadow-2xl p-12 animate-fade-in-up border border-green-200 overflow-hidden">
    
    <div className="absolute -top-32 -right-32 w-80 h-80 bg-green-300 rounded-full opacity-20 animate-pulse-slow"></div>
    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-green-400 rounded-full opacity-15 animate-pulse-slow"></div>

    <button
      onClick={() => setIsOpen(false)}
      className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-3xl font-bold transition-transform duration-200 hover:scale-110"
    >
      ×
    </button>

    <h3 className="text-4xl font-extrabold text-green-700 mb-4 flex justify-center items-center gap-3">
      <FaBug className="text-red-600 text-5xl animate-bounce" /> Bug Report Form
    </h3>
    <p className="text-gray-700 text-center mb-10 max-w-4xl mx-auto text-lg">
      Facing an issue on Aerthx? Select the category and type of problem below. Provide details and screenshots to help us fix it faster.
    </p>

    <form onSubmit={handleSubmit} className="space-y-10">
      
      {[
        {
          category: "UI / UX",
          types: ["UI Issue", "Navigation/Link Issue", "Mobile/Responsive Issue", "Accessibility Issue", "Performance/Slow"]
        },
        {
          category: "Payments & Transactions",
          types: ["Payment Failure", "Refund Issue", "Transaction History Incorrect", "Invoice/Receipt Error"]
        },
        {
          category: "Certificates & Carbon Credits",
          types: ["Certificate Error", "Certificate Download Issue", "Carbon Credit Not Reflected", "NFT/Token Metadata Issue"]
        },
        {
          category: "Features & Subscriptions",
          types: ["Feature Not Working", "Subscription Issue", "Marketplace Listing Problem", "Wallet/MetaMask Connection Issue", "API/Enterprise Dashboard Error"]
        },
        {
          category: "Account & Profile",
          types: ["Profile Update Issue", "Email Verification Problem", "Password Reset Issue"]
        },
        {
          category: "Other",
          types: ["Other"]
        }
      ].map((group) => (
        <div key={group.category}>
          <p className="font-semibold text-gray-800 mb-3 text-lg">{group.category}:</p>
          <div className="flex flex-wrap gap-3">
            {group.types.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleCheckboxChange(type)}
                className={`px-5 py-2 rounded-full border transition-all duration-300 font-medium shadow-sm ${
                  formData.title.includes(type)
                    ? "bg-red-600 text-white border-red-600 shadow-lg scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:scale-105"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div>
        <label className="font-semibold text-gray-800 mb-2 block text-lg">Describe the issue in detail:</label>
        <textarea
          name="description"
          placeholder="Provide a detailed description of the bug, steps to reproduce."
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-5 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-green-300 focus:outline-none h-44 resize-none text-gray-700 placeholder-gray-400 shadow-inner"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-6 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-105"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {success && (
        <p
          className={`text-center mt-4 font-medium text-lg ${
            success.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {success}
        </p>
      )}
    </form>
  </div>
</div>


    )}
  </div>
</section>


      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">User Guides & Resources</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Getting Started with AerthX",
              desc: "Learn how to set up your account, explore projects, and make your first purchase.",
              href: "/docs/getting-started",
            },
            {
              title: "Subscription Plans",
              desc: "Compare Basic, Pro, and Enterprise plans and choose the best fit for your needs.",
              href: "/pricing",
            },
            {
              title: "Certificate Process",
              desc: "Understand how certificates are generated, where to find them, and how to verify them.",
              href: "/docs/certificates",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border hover:shadow-xl transition duration-300 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.desc}</p>
              <a
                href={item.href}
                className="text-indigo-700 font-medium underline hover:text-indigo-900"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-gray-600 mt-24">
        <p className="mb-4 text-base">Review our legal policies:</p>
        <div className="flex flex-wrap justify-center gap-8 text-indigo-700 font-semibold">
          <a href="/privacy-policy" className="underline hover:text-indigo-900 transition">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="underline hover:text-indigo-900 transition">
            Terms of Service
          </a>
          <a href="/refund-policy" className="underline hover:text-indigo-900 transition">
            Refund Policy
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-400">
          © {new Date().getFullYear()} AerthX. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HelpSupport;
