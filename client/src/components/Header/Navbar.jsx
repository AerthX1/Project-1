import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/AerthxLogo.jpg';

const Navbar = () => {
  const [showSolutions, setShowSolutions] = useState(false);
  const [showServices, setShowServices] = useState(false);

  return (
     <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-black">
        AerthX
      </h1>

      {/*   <nav className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: '#fdfcf9' }}>
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="AerthX Logo" className="h-10 w-auto object-contain" />
      </div> */ }

      <ul className="flex items-center gap-6 text-sm text-gray-800">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/marketplace">Marketplace</Link></li>

        <li
          className="relative"
          onMouseEnter={() => setShowSolutions(true)}
          onMouseLeave={() => setShowSolutions(false)}
        >
          <button className="flex items-center gap-1">
            Solutions <span>▾</span>
          </button>
          {showSolutions && (
            <div className="absolute top-5 left-0 bg-white shadow-lg border rounded-md px-4 py-2 z-10">
              <Link to="/solution1" className="block py-1 hover:text-green-600">Solution 1</Link>
              <Link to="/solution2" className="block py-1 hover:text-green-600">Solution 2</Link>
            </div>
          )}
        </li>

        <li
          className="relative"
          onMouseEnter={() => setShowServices(true)}
          onMouseLeave={() => setShowServices(false)}
        >
          <button className="flex items-center gap-1">
            Services <span>▾</span>
          </button>
          {showServices && (
            <div className="absolute top-5 left-0 bg-white shadow-lg border rounded-md px-4 py-2 z-10">
              <Link to="/service1" className="block py-1 hover:text-green-600">Service 1</Link>
              <Link to="/service2" className="block py-1 hover:text-green-600">Service 2</Link>
            </div>
          )}
        </li>

        <li><Link to="/pricing">Pricing</Link></li>
        <li><Link to="/resources">Resources</Link></li>
      </ul>

      <Link
        to="/register"
        className="ml-4 px-4 py-2 bg-green-400 text-white rounded-lg font-semibold hover:bg-green-500 transition-all"
      >
        Register Here
      </Link>
    </nav>
  );
};

export default Navbar;
