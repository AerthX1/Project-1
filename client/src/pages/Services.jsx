import React from "react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaChartBar,
  FaFileAlt,
  FaCertificate,
  FaAward,
  FaBell,
  FaDatabase,
  FaTasks,
  FaCogs,
  FaGlobe,
  FaCheckCircle,
  FaBook,
  FaHandshake,
  FaLock,
  FaRegLightbulb,
  FaUsers,
  FaStar,
  FaFileDownload,
  FaHeadset,
  FaChartLine,
} from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi"; 

const GlassmorphicCard = ({ children, className }) => (
  <motion.div
    className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg p-6 ${className}`}
    whileHover={{ scale: 1.03, rotateX: 3, rotateY: 3 }}
    transition={{ duration: 0.3 }}
    style={{ perspective: 1000 }} 
  >
    {children}
  </motion.div>
);

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2, 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const GlowingButton = ({ children, className, ...props }) => (
  <motion.button
  className={`relative px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-bold overflow-hidden group ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    {...props}
  >
    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
    <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300">
      {children}
    </span>
    <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 opacity-0 blur-md group-hover:opacity-75 transition-opacity duration-300" />
    <span className="absolute inset-0 rounded-full ring-2 ring-inset ring-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </motion.button>
);

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Services = () => {
  const coreServices = [
    {
      icon: <FaLeaf className="text-emerald-400 text-4xl group-hover:animate-spin-slow" />,
      title: "Carbon Credit Marketplace",
      description:
        "Seamlessly purchase verified carbon credits and track your retirement progress in real-time.",
    },
    {
      icon: <FaChartBar className="text-teal-400 text-4xl group-hover:animate-bounce-icon" />,
      title: "Impact Analytics Dashboard",
      description:
        "Access intuitive dashboards with real-time analytics, transaction history, and progress tracking.",
    },
    {
      icon: <FaCertificate className="text-sky-400 text-4xl group-hover:animate-wiggle" />,
      title: "Carbon Offset Certificates",
      description:
        "Receive branded, verifiable certificates to proudly showcase your organization's climate action.",
    },
    {
      icon: <FaAward className="text-yellow-400 text-4xl group-hover:animate-pulse-icon" />,
      title: "Digital Badges",
      description:
        "Earn and display digital badges that highlight your environmental contributions across platforms.",
    },
  ];

  const advancedFeatures = [
    
    {
      icon: <FaFileAlt className="text-purple-400 text-4xl" />,
      title: "BRSR & SDG Reports",
      description:
        "Generate reports compliant with the BRSR framework and UN SDGs.",
    },
    {
      icon: <FaFileDownload className="text-orange-400 text-4xl" />,
      title: "Downloadable Certificates",
      description:
        "Easily download and share official sustainability certificates in high-resolution formats.",
    },
    {
      icon: <FaHeadset className="text-pink-400 text-4xl" />,
      title: "Dedicated Account Support",
      description:
        "Get personalized guidance from sustainability experts.",
    },
    {
      icon: <FaChartLine className="text-indigo-400 text-4xl" />,
      title: "Data-Driven Analytics",
      description:
        "Unlock analytics to identify and reduce emissions across the value chain.",
    },
    {
      icon: <FaCogs className="text-gray-400 text-4xl" />,
      title: "Customizable Reporting",
      description:
        "Tailor reports with flexible data filters and layouts.",
    },
    {
      icon: <FaDatabase className="text-lime-400 text-4xl" />,
      title: "Exclusive Credits",
      description:
        "Get early, exclusive access to limited-edition carbon credit projects before they're released publicly.",
    },
  ];

  const whyChooseUsPoints = [
   {
  icon: <FaLock className="text-white text-3xl" />,
  title: "Trusted Transparency",
  description:
    "Every carbon credit on our platform is traceable, verified, and securely retired for complete trust.",
},
{
  icon: <FaRegLightbulb className="text-white text-3xl" />,
  title: "Expert Guidance",
  description:
    "Work with our sustainability experts to design and implement a climate strategy that delivers real results.",
},
{
  icon: <FaHandshake className="text-white text-3xl" />,
  title: "Global Verified Projects",
  description:
    "Explore a diverse portfolio of internationally certified carbon offset projects you can support with confidence.",
},
{
  icon: <FaUsers className="text-white text-3xl" />,
  title: "Community & Impact",
  description:
    "Be part of a growing community committed to environmental stewardship and meaningful climate action.",
},

  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 font-sans antialiased overflow-hidden">
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 5s linear infinite;
        }

        @keyframes bounce-icon {
          0%,
          100% {
            transform: translateY(-5%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-bounce-icon {
          animation: bounce-icon 1s infinite;
        }

        @keyframes pulse-icon {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        .animate-pulse-icon {
          animation: pulse-icon 1.5s ease-in-out infinite;
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out infinite;
        }
      `}</style>

      <section className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-600 to-green-800 text-white py-16 sm:py-20">
        <div className="absolute inset-0 z-0 opacity-15">
          <motion.div
            className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-lighten filter blur-3xl opacity-30"
            animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 w-80 h-80 bg-green-400 rounded-full mix-blend-lighten filter blur-3xl opacity-30"
            animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <img
            src="https://images.unsplash.com/photo-1542601909-6617c093405c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sustainability background"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-10 relative z-10 text-center flex flex-col items-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter mb-4 sm:mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Empowering Your{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-green-300 text-transparent bg-clip-text">
              Sustainable Future
            </span>
          </motion.h1>
          <motion.p
           className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10 opacity-90"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            AerthX is the all-in-one platform for transparent carbon offsetting,
            verifiable impact reporting, and building a truly green enterprise.
          </motion.p>
          <motion.div
           className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <GlowingButton className="text-lg">
              Get Started <FiArrowRight className="inline-block ml-2" />
            </GlowingButton>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
             className="bg-white/20 border border-white/30 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-bold backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        <motion.img
          src="https://cdn.dribbble.com/users/120286/screenshots/15609653/media/ae04e578c2e6f47702f308a0df5a525d.png?resize=1000x750&vertical=center"
          alt="AerthX Dashboard Preview"
         className="hidden sm:block absolute bottom-0 right-0 w-2/3 md:w-1/2 lg:w-2/5 drop-shadow-2xl translate-x-1/5 md:translate-x-1/6 translate-y-1/5 md:translate-y-1/6"
          initial={{ opacity: 0, x: 100, y: 100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        />
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-white to-gray-50 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.h2
         className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 leading-tight"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Simplify Your <span className="text-emerald-600">Sustainability Journey</span>
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-10"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {coreServices.map((service, index) => (
              <motion.div
                key={index}
                className="group p-5 sm:p-6 md:p-8 rounded-2xl bg-white shadow-md sm:shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                variants={cardVariants}
                custom={index}
              >
                <div className="p-4 bg-emerald-50 rounded-full mb-6 relative">
                  {service.icon}
                  <span className="absolute inset-0 rounded-full bg-emerald-200 opacity-0 group-hover:opacity-75 group-hover:animate-ping-slow" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="relative -mt-16">
        <svg
          className="w-full h-auto text-white"
          viewBox="0 0 1440 120"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0C144 60 288 90 432 90C576 90 720 60 864 30C1008 0 1152 0 1296 30C1440 60 1440 120 1440 120H0V0Z" />
        </svg>
      </div>

      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={textVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Unlock Deeper{" "}
                <span className="text-teal-600">
                  Insights with Advanced Analytics
                </span>
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Go beyond basic tracking. Our advanced analytics dashboard
                provides comprehensive data on your carbon footprint, offset
                performance, and alignment with global sustainability goals.
                Make data-driven decisions for a greener future.
              </p>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li className="flex items-center">
                  <FaCheckCircle className="text-emerald-500 mr-3 text-xl" />{" "}
                  Real-time Impact Visualization
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-emerald-500 mr-3 text-xl" />{" "}
                  Customizable Reporting Tools
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-emerald-500 mr-3 text-xl" />{" "}
                  Predictive Emission Trends
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-3xl shadow-2xl border border-gray-700 aspect-video flex flex-col justify-between"
              variants={cardVariants}
            >
              <div className="flex justify-between items-center text-gray-300 mb-4">
                <span className="text-sm font-semibold">AerthX Dashboard</span>
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
              </div>
              <div className="flex-grow grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl flex flex-col justify-between">
                  <h4 className="text-sm text-gray-400 mb-2">Total CO2 Offset</h4>
                  <motion.p
                    className="text-3xl font-bold text-emerald-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 100, delay: 0.7 }}
                    >
                      12,450
                    </motion.span>{" "}
                    tonnes
                  </motion.p>
                  <motion.div
                    className="w-full bg-gray-700 rounded-full h-2 mt-3"
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                  >
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "80%" }} />
                  </motion.div>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl">
                  <h4 className="text-sm text-gray-400 mb-2">Projects Engaged</h4>
                  <motion.p
                    className="text-3xl font-bold text-teal-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 100, delay: 0.9 }}
                    >
                      18
                    </motion.span>{" "}
                    active
                  </motion.p>
                  <div className="flex space-x-1 mt-3 h-8 items-end">
                    {[60, 40, 80, 50, 70, 90, 65].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-2 bg-blue-500 rounded-sm"
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <motion.div
                className="bg-gray-800 p-4 rounded-xl mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <h4 className="text-sm text-gray-400 mb-2">Emission Trends</h4>
                <div className="h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xs">
                  (Mock Line Chart Data Here)
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="relative w-full h-32 bg-gradient-to-br from-white to-gray-50 transform skew-y-2 origin-top-left -mt-16" />

      <section className="py-24 bg-gradient-to-br from-emerald-50 to-green-50 relative z-10">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Powering Your <span className="text-indigo-600">Enterprise Solutions</span>
          </motion.h2>
          <div className="grid gap-6 sm:gap-8 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {advancedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-start space-x-6 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <div className="shrink-0 p-3 bg-gray-50 rounded-lg group-hover:bg-emerald-100 transition-colors duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-base">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Why Leading Businesses <span className="text-green-600">Choose AerthX</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-8 sm:gap-y-10 md:gap-y-12">
            {whyChooseUsPoints.map((point, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <div className="p-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-xl mb-6 relative">
                  {point.icon}
                  <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 animate-ping-slow" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-600 text-sm">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-16 md:py-24 bg-cover bg-center text-white overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510511451846-957779f428c0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <div className="absolute inset-0 bg-emerald-800 bg-opacity-80 backdrop-brightness-75" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Ready to Accelerate Your Impact?
          </motion.h2>
          <motion.p
           className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 opacity-90"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join the growing number of companies and individuals committed to a
            sustainable future with AerthX.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <GlowingButton className="text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4">
              Explore Our Plans <FiArrowRight className="inline-block ml-3" />
            </GlowingButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;