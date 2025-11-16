import React, { useEffect, useState } from "react";
import starterVideo from "../assets/introfirstvideo.mp4";
import graph from "../assets/graph.jpg";
import goldstandard from "../assets/gold-standard.png";
import verra from "../assets/Verra-Logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const IconWrapper = ({ children, className }) => (
    <div className={`w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-emerald-500/10 ${className}`}>
        {children}
    </div>
);

const CertifiedIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.275a1.125 1.125 0 011.264-.076l1.248.8a1.125 1.125 0 010 1.954l-1.248.8a1.125 1.125 0 01-1.264-.076l-1.632-1.088a1.125 1.125 0 01-.52-1.558l.64-1.28A1.125 1.125 0 0115.618 7.725z" />
    </svg>
);

const BriefcaseIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const LeafIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a4 4 0 01-5.657 0" />
    </svg>
);


const testimonials = [
    {
        quote: "AerthX made our goal of becoming a carbon-neutral enterprise incredibly straightforward. The verified projects gave us full confidence in our investment.",
        name: "Alex Johnson",
        title: "Chief Sustainability Officer, TechCorp",
        avatar: "https://i.pravatar.cc/150?img=6"
    },
    {
        quote: "The seamless integration into our e-commerce platform allowed us to offer carbon offsets to every customer. It’s been a massive win for our brand image.",
        name: "Sarah Chen",
        title: "Founder, Eco-Goods Inc.",
        avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
        quote: "I love the ability to track my personal emissions and offset them instantly. AerthX is the most user-friendly platform I've found for climate action.",
        name: "Michael Davis",
        title: "Freelance Designer & Climate Advocate",
        avatar: "https://i.pravatar.cc/150?img=1"
    },
];

const AnimatedStat = ({ start, end, label, unit }) => {
    const [displayNumber, setDisplayNumber] = useState(start);

    useEffect(() => {
        let current = start;
        const increment = (end - start) / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                setDisplayNumber(end);
                clearInterval(timer);
            } else {
                setDisplayNumber(Math.floor(current));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [start, end]);

    return (
        <div className="flex flex-col items-center p-4">
            <h3 className="text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-lime-500 mb-2 drop-shadow-md">
                {displayNumber.toLocaleString()}
                <span className="text-3xl font-light text-gray-200 ml-1">{unit}</span>
            </h3>
            <p className="text-lg font-medium text-gray-400 uppercase tracking-wider">{label}</p>
        </div>
    );
};


export default function Home() {
    const [remainingTons, setRemainingTons] = useState(0);
    const [totalTons, setTotalTons] = useState(0); 
    const userType = useSelector((state) => state.auth.userType);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchRemainingTons = async () => {
            try {
                const initialTons = 1000000; 
                setRemainingTons(initialTons);

                const res = await axios.get(`${import.meta.env.VITE_API_URL}/carbon-credits/total-tons`);
                const actualTons = res.data.remainingTons || 0;
                
                const duration = 2000;
                const steps = 50;
                const stepTime = duration / steps;
                const increment = (actualTons - initialTons) / steps;
                let current = initialTons;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= actualTons) {
                        setRemainingTons(actualTons);
                        clearInterval(timer);
                    } else {
                        setRemainingTons(Math.floor(current));
                    }
                }, stepTime);

                return () => clearInterval(timer);
            } catch (error) {
                console.error("Error fetching remaining tons:", error.message);
                setRemainingTons(12345678); 
            }
        };
        fetchRemainingTons();
    }, []);

    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 8000); 
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="flex flex-col items-center w-full min-h-screen font-sans bg-gray-50 antialiased">
            
            <section 
                className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden text-white"
                style={{ fontFamily: 'Poppins, sans-serif' }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-90"
                >
                    <source src={starterVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900/90 via-black/40 to-black/10 z-10"></div>

                <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-6xl animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-snug tracking-tight drop-shadow-2xl">
                        Empowering Businesses to Go <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-lime-500">Carbon Neutral</span>
                    </h1>
                    <p className="text-xl sm:text-2xl mb-12 font-light text-gray-200 drop-shadow-lg max-w-3xl animate-fade-in delay-200">
                        Secure, verified, and high-impact carbon credits to meet your sustainability goals with absolute transparency.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link
                            to={import.meta.env.VITE_CLIENT_URL}
                            className="group inline-flex items-center justify-center gap-2 
                                        bg-gradient-to-r from-emerald-500 to-green-600 
                                        text-white font-bold text-xl tracking-wider
                                        py-4 px-12 rounded-full shadow-2xl shadow-emerald-500/50 
                                        transition-all duration-300 ease-out 
                                        hover:from-emerald-600 hover:to-green-700 hover:shadow-emerald-500/80 
                                        transform hover:scale-[1.05] relative overflow-hidden"
                        >
                            <span className="drop-shadow-sm">Buy Credits Now</span>
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                        </Link>
                        <Link
                            to="#how-it-works"
                            className="inline-flex items-center justify-center gap-2 
                                        border-2 border-white text-white font-bold text-xl
                                        py-4 px-12 rounded-full shadow-lg shadow-black/50 
                                        transition-all duration-300 ease-out 
                                        hover:bg-white hover:text-gray-900 hover:shadow-white/20
                                        transform hover:scale-[1.05]"
                        >
                            Learn More
                        </Link>
                    </div>

                    <div className="mt-16 text-lg font-bold text-gray-200 backdrop-blur-sm bg-black/20 px-8 py-3 rounded-xl border border-emerald-500/50 shadow-lg">
                        <span className="text-emerald-400 mr-2">LIVE:</span> {remainingTons.toLocaleString()} CO₂ Credits Available
                    </div>
                </div>
            </section>

            <section className="px-4 md:px-12 py-24 bg-white w-full">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 text-center">
                        Why Invest in <span className="text-emerald-600">Carbon Credits</span>?
                    </h2>
                    <p className="text-gray-600 text-center mb-20 max-w-3xl mx-auto text-xl font-light">
                        Offset your footprint, support sustainable projects, and contribute to a greener, more resilient future.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                        {[
                            { title: "Tangible Climate Action", desc: "Fund verified projects that actively reduce CO₂ emissions, support reforestation, and protect vital ecosystems.", icon: <LeafIcon /> },
                            { title: "Boost Your Brand & ESG", desc: "Demonstrate leadership in sustainability, improve your ESG rating, and appeal to a conscious market.", icon: <BriefcaseIcon /> },
                            { title: "Community & Biodiversity", desc: "Invest in projects that provide co-benefits like poverty reduction, clean water access, and biodiversity preservation.", icon: <CertifiedIcon /> },
                        ].map((card, i) => (
                            <div key={i} className="group p-10 bg-white rounded-xl shadow-xl border-t-4 border-transparent transition duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:border-emerald-500 transform hover:rotate-z-1">
                                <IconWrapper className="mx-auto bg-gradient-to-r from-emerald-500/10 to-green-500/10">
                                    {card.icon}
                                </IconWrapper>
                                <h3 className="font-bold text-2xl mb-3 text-gray-900 group-hover:text-emerald-600 transition duration-300">
                                    {card.title}
                                </h3>
                                <p className="text-gray-600 text-lg">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full bg-gray-900 py-24 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-emerald-500 opacity-[0.05] blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-1/3 h-full bg-lime-500 opacity-[0.05] blur-3xl"></div>

                <div className="max-w-7xl mx-auto text-white px-4 relative z-10">
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-center mb-16">
                        Our Verified <span className="text-green-400">Impact</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
                        <div className="p-6 bg-white/5 rounded-xl backdrop-blur-md border border-transparent transition hover:scale-[1.05] duration-500 relative overflow-hidden group hover:border-emerald-500/50 shadow-xl">
                            <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm"></div>
                            <AnimatedStat start={0} end={35000} label="Tons CO₂ Offset" unit="k" />
                        </div>
                        <div className="p-6 bg-white/5 rounded-xl backdrop-blur-md border border-transparent transition hover:scale-[1.05] duration-500 relative overflow-hidden group hover:border-emerald-500/50 shadow-xl">
                            <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm"></div>
                            <AnimatedStat start={0} end={120} label="Projects Supported" unit="+" />
                        </div>
                        <div className="p-6 bg-white/5 rounded-xl backdrop-blur-md border border-transparent transition hover:scale-[1.05] duration-500 relative overflow-hidden group hover:border-emerald-500/50 shadow-xl">
                            <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm"></div>
                            <AnimatedStat start={0} end={150000} label="Trees Planted" unit="k" />
                        </div>
                        <div className="p-6 bg-white/5 rounded-xl backdrop-blur-md border border-transparent transition hover:scale-[1.05] duration-500 relative overflow-hidden group hover:border-emerald-500/50 shadow-xl">
                            <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm"></div>
                            <AnimatedStat start={0} end={45} label="Global Partners" unit="+" />
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-24 w-full bg-white">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-20 text-center">
                    The <span className="text-emerald-600">AerthX</span> Difference
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-20 max-w-7xl mx-auto">
                    
                    <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-emerald-300 transition duration-300 transform hover:-translate-y-2 group">
                        <IconWrapper className="bg-emerald-500/20 group-hover:bg-emerald-500/30 transition duration-300">
                            <CertifiedIcon className="group-hover:text-emerald-700 transition duration-300" />
                        </IconWrapper>
                        <h3 className="font-bold text-xl mb-3 text-gray-900">Verified & Certified</h3>
                        <p className="text-gray-600 text-center text-md">All credits come from rigorously verified and certified projects, ensuring real, measurable climate impact you can trust.</p>
                    </div>

                    <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-emerald-300 transition duration-300 transform hover:-translate-y-2 group">
                        <IconWrapper className="bg-emerald-500/20 group-hover:bg-emerald-500/30 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-4-4h.01M9 21h6a2 2 0 002-2v-2a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2z" />
                            </svg>
                        </IconWrapper>
                        <h3 className="font-bold text-xl mb-3 text-gray-900">Instant Transparency</h3>
                        <p className="text-gray-600 text-center text-md">Get real-time reports to track your offsets and environmental progress instantly, perfect for audits and ESG goals.</p>
                    </div>

                    <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-emerald-300 transition duration-300 transform hover:-translate-y-2 group">
                        <IconWrapper className="bg-emerald-500/20 group-hover:bg-emerald-500/30 transition duration-300">
                             <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5m2 7h2.5a2.5 2.5 0 002.5-2.5V11" />
                            </svg>
                        </IconWrapper>
                        <h3 className="font-bold text-xl mb-3 text-gray-900">Global Portfolio</h3>
                        <p className="text-gray-600 text-center text-md">Access a diverse portfolio of global projects, allowing you to invest in a broad range of verified climate solutions.</p>
                    </div>
                    
                </div>
            </section>

            <section className="py-24 w-full bg-gray-900 text-white relative">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8">
                    
                    <div className="flex flex-col items-center md:items-start text-center md:text-left mb-16 md:mb-0 max-w-lg">
                        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
                            Live Carbon Credits <span className="text-emerald-400">Inventory</span>
                        </h2>
                        <p className="text-7xl sm:text-8xl font-black text-emerald-400 mb-8 drop-shadow-2xl">
                            {remainingTons.toLocaleString()} 
                            <span className="text-white text-4xl ml-3 font-light">Tons CO₂</span>
                        </p>
                        <p className="text-xl text-gray-300 max-w-md mb-10 font-light">
                            Real-time inventory of verified credits ready for immediate offset. Secure your climate commitment today.
                        </p>

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                            <Link to='/MarketplaceHero' 
                                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-10 rounded-full shadow-xl shadow-emerald-500/30 transition duration-300 transform hover:scale-105"
                            >
                                Buy Credits
                            </Link>
                            <button 
                                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-full shadow-xl shadow-black/30 transition duration-300 transform hover:scale-105 border-2 border-gray-700 hover:border-emerald-500"
                            >
                                Track Usage
                            </button>
                        </div>
                    </div>
                    
                    <div className="max-w-xl w-full relative p-6 bg-white/5 rounded-2xl backdrop-blur-md border border-emerald-600/50 shadow-2xl shadow-emerald-900/50 group">
                        <div className="absolute inset-0 bg-emerald-500 opacity-10 blur-3xl rounded-xl"></div>
                        <img src={graph} alt="Carbon credit historical graph" className="w-full h-auto rounded-xl relative transition duration-500 group-hover:scale-[1.01]" />
                    </div>

                </div>
            </section>

            <section id="how-it-works" className="py-24 bg-gray-50 w-full">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-20 text-center">
                    Simple <span className="text-emerald-600">4-Step Process</span>
                </h2>
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="relative flex flex-col md:grid md:grid-cols-4 gap-8">
                        
                        <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-emerald-200 mx-12"></div>

                        {[
                            { title: 'Explore Projects', desc: 'Browse and choose a high-quality, certified climate project that aligns with your values.', icon: '🔍' },
                            { title: 'Buy Credits', desc: 'Easily purchase the necessary carbon credits to meet your individual or corporate offset goals.', icon: '💸' },
                            { title: 'Verify Ownership', desc: 'Your credit ownership is securely recorded and permanently verifiable through an open ledger.', icon: '🔒' },
                            { title: 'Track & Report', desc: 'Monitor your impact in real-time and download your official ESG certificate for transparent reporting.', icon: '📈' },
                        ].map((step, i) => (
                            <div key={i} className="relative pt-8 md:pt-16 text-center group">
                                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 md:top-8 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white font-bold ring-4 ring-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:ring-emerald-200`}>
                                    {i + 1}
                                </div>
                                <div className="absolute top-0 left-6 w-1 h-full bg-emerald-200 md:hidden"></div> 

                                <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 transition duration-300 text-left md:text-center mt-4 transform group-hover:translate-y-[-5px] group-hover:shadow-2xl">
                                    <div className="mb-3 text-center text-2xl">{step.icon}</div>
                                    <h3 className="font-extrabold text-lg text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-600 font-light">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="py-24 w-full bg-white">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-16 text-center">
                    Who <span className="text-emerald-600">We Empower</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-8 max-w-7xl mx-auto">
                    
                    {[
                        { title: "Corporates & Enterprises", desc: "Meet regulatory and ESG goals with verifiable carbon offsets and comprehensive reporting.", icon: '🏢' },
                        { title: "E-Commerce & Startups", desc: "Integrate offsetting directly into your product delivery for a transparent, climate-positive customer experience.", icon: '🛒' },
                        { title: "Individuals & Freelancers", desc: "Track and offset personal emissions from travel, energy, and consumption easily and reliably.", icon: '👤' },
                        { title: "Educational Institutions", desc: "Promote sustainability by supporting real environmental projects and educating your community on climate action.", icon: '📚' },
                    ].map((card, i) => (
                        <div key={i} className="group bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition duration-300 transform hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="mb-3 text-3xl text-emerald-600">{card.icon}</div>
                            <h3 className="font-extrabold text-lg mb-2 text-gray-900">{card.title}</h3>
                            <p className="text-gray-600 text-sm">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-24 bg-gray-50 w-full">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-20 text-center">
                    Client <span className="text-emerald-600">Testimonials</span>
                </h2>
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white p-8 sm:p-12 rounded-xl shadow-2xl border border-gray-100 relative min-h-[300px] flex flex-col justify-center overflow-hidden">
                        
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 p-8 sm:p-12 transition-opacity duration-700 ease-in-out 
                                            ${index === currentTestimonialIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'}`
                                        }
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl opacity-50 z-0"></div>

                                <p className="text-xl italic font-serif text-gray-700 leading-relaxed mb-8 relative z-10">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center mt-6 relative z-10">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-emerald-400 shadow-md" />
                                    <div>
                                        <p className="font-bold text-lg text-emerald-700">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500">{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonialIndex(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${index === currentTestimonialIndex ? 'bg-emerald-600 scale-110 shadow-md' : 'bg-gray-300 hover:bg-gray-400'}`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-white w-full text-center">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12">
                    Certified <span className="text-emerald-600">Integrity</span>
                </h2>
                <p className="text-xl max-w-3xl mx-auto mb-16 text-gray-600 px-4 font-light">
                    We source certified carbon credits from globally recognized registries, ensuring environmental integrity and transparency.
                </p>
                <div className="flex justify-center items-center flex-wrap gap-12 sm:gap-24 px-4 max-w-7xl mx-auto">
                    
                    <div className="w-60 h-32 sm:w-60 sm:h-40 flex items-center justify-center p-6 bg-white rounded-xl shadow-lg transition duration-500 ease-in-out hover:shadow-emerald-200 filter grayscale hover:grayscale-0 transform hover:scale-105">
                        <img src={verra} alt="Verra" className="max-h-full max-w-full object-contain" />
                    </div>

                    <div className="w-60 h-32 sm:w-60 sm:h-40 flex items-center justify-center p-6 bg-white rounded-xl shadow-lg transition duration-500 ease-in-out hover:shadow-emerald-200 filter grayscale hover:grayscale-0 transform hover:scale-105">
                        <img src={goldstandard} alt="Gold Standard" className="max-h-full max-w-full object-contain" />
                    </div>
                </div>
            </section>

            <section 
                className="w-full text-white py-24 px-4 text-center relative z-10"
                style={{ 
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', 
                    boxShadow: '0 -5px 20px rgba(0,0,0,0.1)'
                }}
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-md">
                        Ready to Begin Your <span className="text-white drop-shadow-lg">Net-Zero Journey</span>?
                    </h2>
                    <p className="text-xl sm:text-2xl mb-12 max-w-3xl mx-auto font-light text-green-100">
                        Join thousands of businesses making a tangible difference. Start your climate-positive journey with AerthX today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        
                        {userType ? (
                            <Link
                                to={user?.orgName ? "/pricing" : "/individual-pricing"}
                                className="group inline-flex items-center justify-center border-2 border-white bg-white text-emerald-700 font-bold py-4 px-10 rounded-full transition-all duration-300 ease-in-out 
                                            hover:bg-transparent hover:text-white hover:border-white shadow-xl shadow-black/30 text-lg transform hover:scale-105"
                            >
                                View Pricing Plans
                            </Link>
                        ) : (
                            <button 
                                className="inline-flex items-center justify-center border-2 border-white bg-white text-emerald-700 font-bold py-4 px-10 rounded-full transition-all duration-300 opacity-70 cursor-not-allowed text-lg"
                                disabled
                            >
                                Loading...
                            </button>
                        )}

                        <Link
                            to="/contactus"
                            className="group inline-flex items-center justify-center border-2 border-white text-white font-bold py-4 px-10 rounded-full transition-all duration-300 ease-in-out 
                                        hover:bg-white hover:text-emerald-700 shadow-xl shadow-black/30 text-lg transform hover:scale-105"
                        >
                            Contact Our Team
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}