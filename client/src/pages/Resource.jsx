import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";


const ListItem = ({ children }) => (
  <li className="flex items-start space-x-3 py-3 border-b last:border-none border-gray-200 hover:bg-green-50 transition cursor-default">
    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
    <p className="text-gray-700 text-base md:text-lg leading-relaxed">{children}</p>
  </li>
);


const Section = ({ title, children }) => (
  <section className="bg-white rounded-lg shadow p-6 md:p-10">
    <h2 className="text-2xl font-semibold text-green-700 mb-6">{title}</h2>
    {children}
  </section>
);

const faqData = [
  {
    question: "What is the cost to purchase carbon credits?",
    answer:
      "The cost varies based on the project and market conditions but typically ranges from $5 to $15 per carbon credit.",
  },
  // {
  //   question: "How does blockchain ensure transparency?",
  //   answer:
  //     "Blockchain creates a tamper-proof and publicly verifiable ledger of all carbon credit transactions, ensuring trust and traceability.",
  // },
  {
    question: "Are carbon credits legally binding?",
    answer:
      "Carbon credits are recognized as legitimate instruments for offsetting emissions, but the legal status can depend on local regulations.",
  },
  {
    question: "How do I track my offset impact?",
    answer:
      "You can monitor your offset progress and emissions reduction through the Aearthex dashboard, with detailed reports and analytics.",
  },
  {
    question: "Can I cancel or change my subscription later?",
    answer:
      "Yes, you can manage your subscription preferences anytime from your account settings with flexible cancellation policies.",
  },
];

const FAQItem = ({ question, answer, isOpen, onToggle, id }) => (
  <div className="border-b border-gray-200 last:border-none">
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`faq-desc-${id}`}
      className="flex justify-between items-center w-full py-5 text-left focus:outline-none focus:ring-2 focus:ring-green-600 hover:bg-green-50 transition"
    >
      <span className="text-green-700 text-lg md:text-xl pl-8 font-semibold">{question}</span>
      <svg
        className={`w-6 h-6 text-green-600 transform transition-transform duration-300 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div
      id={`faq-desc-${id}`}
      className={`pl-6 pr-4 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
        isOpen ? "max-h-96 py-3" : "max-h-0 py-0"
      }`}
      role="region"
      aria-live="polite"
    >
      <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-2">{answer}</p>
    </div>
  </div>
);


const Resource = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main
      className="px-6 md:px-16 py-14 max-w-5xl mx-auto text-gray-800 space-y-14"
      aria-label="Resources Page"
    >
  <header className="text-center max-w-3xl mx-auto px-4 sm:px-0">
  <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-6 tracking-wide">
    Explore Aearthex Resources
  </h1>
  <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
    Access comprehensive guides, FAQs, and referral insights crafted to help you navigate carbon offsetting and sustainability with ease.
  </p>
</header>


     <Section title="Guides & Tutorials">
  <ul className="list-none p-0 m-0">
    <ListItem>
      <strong>How to Buy Carbon Credits:</strong> Learn how to choose and purchase credits safely.
    </ListItem>
    {/* <ListItem>
      <strong>Blockchain Transparency Explained:</strong> How blockchain ensures trust and traceability.
    </ListItem> */}
    <ListItem>
      <strong>Using Aearthex Dashboard:</strong> Monitor carbon footprint, subscriptions, and progress.
    </ListItem>
    <ListItem>
      <strong>Offset Strategies:</strong> Best practices for individual and organizational carbon offsetting.
    </ListItem>
    <ListItem>
      <strong>ESG Reporting with Aearthex:</strong> Generate reports aligned with industry standards.
    </ListItem>
  </ul>
  <Link
    to="/guides"
    className="inline-block mt-6 px-6 py-3 bg-green-700 text-white text-base rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
    aria-label="View all guides and tutorials"
  >
    View All Guides
  </Link>
</Section>

<Section title="Our Journey Begins">
  <div className="bg-green-50 border border-green-200 rounded-lg p-8 max-w-4xl mx-auto text-center">
    <h3 className="text-green-800 text-2xl font-semibold mb-4">
      Building a Greener Future Together
    </h3>
    <p className="text-gray-700 text-lg leading-relaxed max-w-xl mx-auto">
      Aearthex is a young and ambitious platform committed to driving sustainability and transparency in carbon offsetting.  
      We’re currently laying the groundwork and look forward to sharing impactful success stories as we grow.  
      Stay tuned for exciting updates and real-world results.
    </p>
  </div>
</Section>

      <Section title="Frequently Asked Questions">
        <div role="list" aria-label="Frequently asked questions" className="divide-y divide-gray-200">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              id={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </Section>

      {/* <section
        className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 max-w-4xl mx-auto transition-all duration-300"
        aria-labelledby="referral-heading"
      >
        <h2
          id="referral-heading"
          className="text-3xl font-bold text-gray-900 mb-6 text-center"
        >
          Referral Program
        </h2>

        <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-3xl mx-auto text-center">
          Help others join the sustainability mission. Share Aearthex and earn rewards — while your referrals enjoy zero platform fees and seamless onboarding.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {[
            {
              title: "No Platform Fees",
              desc: "Your referrals get started with no extra charges on their transactions.",
            },
            {
              title: "Earn Subscription Discounts",
              desc: "You receive exclusive discounts for every successful referral.",
            },
            {
              title: "Real-Time Tracking",
              desc: "View your referral stats and earnings directly from your dashboard.",
            },
            {
              title: "Flexible Sharing",
              desc: "Invite clients, friends, or teams with a unique referral code.",
            },
          ].map((item, index) => (
            <article
              key={index}
              className="p-6 border border-gray-100 rounded-lg hover:shadow-lg hover:border-green-300 transition-shadow duration-300"
            >
              <h3 className="font-semibold text-green-700 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-base">{item.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="px-8 py-3 rounded-md bg-green-700 text-white text-lg font-semibold hover:bg-green-800 hover:shadow-xl transition duration-300"
            aria-label="Join the Aearthex referral program"
          >
            Join Referral Program
          </button>
        </div>
      </section> */}
    </main>
  );
};

export default Resource;
