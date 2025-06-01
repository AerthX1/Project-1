import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/AerthxLogo.jpg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showServices, setShowServices] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 relative z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* <img src={Logo} alt="AerthX Logo" className="h-10 w-auto object-contain" /> */}
          <h1 className="text-2xl font-bold text-black">AerthX</h1>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black text-3xl focus:outline-none"
          >
            ☰
          </button>
        </div>

        <ul className="hidden lg:flex items-center gap-6 text-sm text-gray-800">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/marketplace">Marketplace</Link></li>

          <li className="relative group">
            <Link to="/solution" className="flex items-center gap-1">
              Solutions <span>▾</span>
            </Link>
            <div className="absolute top-5 left-0 bg-white shadow-lg border rounded-md px-4 py-2 z-10 hidden group-hover:block">
              <Link to="/solution1" className="block py-1 hover:text-green-600">Solution 1</Link>
              <Link to="/solution2" className="block py-1 hover:text-green-600">Solution 2</Link>
            </div>
          </li>

          <li className="relative group">
            <Link to="/service" className="flex items-center gap-1">
              Services <span>▾</span>
            </Link>
            <div className="absolute top-5 left-0 bg-white shadow-lg border rounded-md  px-4 py-2 z-10 hidden group-hover:block">
              <Link to="/service1" className="block py-1 hover:text-green-600">Service 1</Link>
              <Link to="/service2" className="block py-1 hover:text-green-600">Service 2</Link>
            </div>
          </li>

          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/resources">Resources</Link></li>

          <Link
            to="/register"
            className="ml-4 px-4 py-2 bg-green-400 text-white rounded-lg font-semibold hover:bg-green-500 transition-all"
          >
            Register Here
          </Link>
        </ul>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-4 text-lg text-gray-800">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-3xl font-bold"
          >
            ✕
          </button>

          <Link to="/" className="hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/marketplace" className="hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Marketplace</Link>

          <div className="w-full max-w-xs text-center">
            <button
              className="w-full font-semibold"
              onClick={() => setShowSolutions(!showSolutions)}
            >
              Solutions {showSolutions ? '▲' : '▼'}
            </button>
            {showSolutions && (
              <div className="mt-2 space-y-2">
                <Link to="/solution1" onClick={() => setIsMenuOpen(false)} className="block">Solution 1</Link>
                <Link to="/solution2" onClick={() => setIsMenuOpen(false)} className="block">Solution 2</Link>
              </div>
            )}
          </div>

          <div className="w-full max-w-xs text-center">
            <button
              className="w-full font-semibold"
              onClick={() => setShowServices(!showServices)}
            >
              Services {showServices ? '▲' : '▼'}
            </button>
            {showServices && (
              <div className="mt-2 space-y-2">
                <Link to="/service1" onClick={() => setIsMenuOpen(false)} className="block">Service 1</Link>
                <Link to="/service2" onClick={() => setIsMenuOpen(false)} className="block">Service 2</Link>
              </div>
            )}
          </div>

          <Link to="/pricing" className="hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
          <Link to="/resources" className="hover:text-green-600" onClick={() => setIsMenuOpen(false)}>Resources</Link>

          <Link
            to="/register"
            className="bg-green-500 text-white px-6 py-2 rounded-md font-medium hover:bg-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Register Here
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
