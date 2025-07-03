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
      {isOpen && <div className="p-5 text-gray-600 bg-gray-50 border-t text-base leading-relaxed">{faq.answer}</div>}
    </div>
  );
};

const HelpSupport = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 flex justify-center items-center gap-4">
          <FaRegQuestionCircle className="text-indigo-600" /> Help & Support
        </h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
          Find answers to your questions, report issues, and learn how to get the most from Aearthex.
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
          {[{
            icon: <FaEnvelope className="text-indigo-600 text-3xl mb-3" />,
            title: 'Email Us',
            desc: 'support@aearthex.com',
            href: 'mailto:support@aearthex.com'
          }, {
            icon: <FaPhone className="text-indigo-600 text-3xl mb-3" />,
            title: 'Call Support',
            desc: '+91 98765 43210',
            extra: '(Mon–Fri, 9AM–6PM IST)'
          }, {
            icon: <FaDiscord className="text-indigo-600 text-3xl mb-3" />,
            title: 'Join Discord',
            desc: 'Community Chat',
            href: 'https://discord.gg/aearthex'
          }].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border hover:shadow-xl transition-all duration-300 text-center">
              {item.icon}
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
              {item.href ? (
                <a href={item.href} className="text-indigo-700 underline hover:text-indigo-900 text-sm">{item.desc}</a>
              ) : (
                <p className="text-gray-700 text-sm">{item.desc}</p>
              )}
              {item.extra && <p className="text-xs text-gray-400 mt-1">{item.extra}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">More Ways to Reach Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[{
  icon: (
    <div className="flex justify-center items-center mb-3">
      <FaWhatsapp className="text-green-600 text-3xl" />
    </div>
  ),
  label: 'WhatsApp',
  link: 'https://wa.me/919876543210',
  bg: 'bg-green-50'
}
, {
  icon: (
    <div className="text-3xl font-extrabold text-black mb-3 group-hover:scale-110 transition-transform duration-300">
      X
    </div>
  ),
  label: 'X (formerly Twitter)',
  link: 'https://x.com/Aearthex',
  bg: 'bg-gray-100 hover:bg-gray-200 transition-colors duration-300 group'
}


,  {
  icon: (
    <div className="flex justify-center items-center mb-3">
      <FaGlobe className="text-gray-700 text-3xl" />
    </div>
  ),
  label: 'Documentation',
  link: '/docs',
  bg: 'bg-gray-100'
}
].map((item, idx) => (
            <div key={idx} className={`${item.bg} p-6 rounded-xl hover:shadow-xl transition duration-300 text-center`}>
              {item.icon}
              <p className="text-base font-semibold text-gray-700 mb-1">{item.label}</p>
              <a href={item.link} className="text-indigo-700 underline hover:text-indigo-900 text-sm">Visit</a>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20 text-center bg-red-50 border border-red-200 p-10 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-red-700 mb-3 flex justify-center items-center gap-2">
          <FaBug /> Report a Bug
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Found an issue while using Aearthex? Let us know and we’ll fix it as soon as possible.
        </p>
        <a
          href="https://forms.gle/report-aearthex-issue"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Submit a Bug Report
        </a>
      </section>

    <section className="mb-20">
  <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">User Guides & Resources</h2>
  <div className="grid md:grid-cols-3 gap-8">
    {[{
      title: "Getting Started with Aearthex",
      desc: "Learn how to set up your account, explore projects, and make your first purchase.",
      href: "/docs/getting-started"
    }, {
      title: "Subscription Plans",
      desc: "Compare Basic, Pro, and Enterprise plans and choose the best fit for your needs.",
      href: "/pricing"
    }, {
      title: "Certificate Process",
      desc: "Understand how certificates are generated, where to find them, and how to verify them.",
      href: "/docs/certificates"
    }].map((item, idx) => (
      <div key={idx} className="bg-white p-6 rounded-xl border hover:shadow-xl transition duration-300 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.desc}</p>
        <a href={item.href} className="text-indigo-700 font-medium underline hover:text-indigo-900">Read More →</a>
      </div>
    ))}
  </div>
</section>

<footer className="text-center text-gray-600 mt-24">
  <p className="mb-4 text-base">Review our legal policies:</p>
  <div className="flex flex-wrap justify-center gap-8 text-indigo-700 font-semibold">
    <a href="/privacy-policy" className="underline hover:text-indigo-900 transition">Privacy Policy</a>
    <a href="/terms-of-service" className="underline hover:text-indigo-900 transition">Terms of Service</a>
    <a href="/refund-policy" className="underline hover:text-indigo-900 transition">Refund Policy</a>
  </div>
  <p className="mt-6 text-sm text-gray-400">© {new Date().getFullYear()} Aearthex. All rights reserved.</p>
</footer>
</div>
);
};

export default HelpSupport;