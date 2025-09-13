import React from "react";

const IndividualPricing = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-blue-100 to-green-200 flex items-center justify-center">
      {/* Sun */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-yellow-400 animate-pulse"></div>

      {/* Moving Clouds */}
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>

      {/* Forest */}
      <div className="absolute bottom-0 w-full h-1/2 flex justify-between items-end">
        <div className="tree tree1"></div>
        <div className="tree tree2"></div>
        <div className="tree tree3"></div>
        <div className="tree tree4"></div>
        <div className="tree tree5"></div>
      </div>

      {/* Text */}
      <h1 className="relative text-4xl sm:text-6xl font-extrabold text-green-900 drop-shadow-lg z-10">
        Welcome to Individual Pricing
      </h1>

      {/* CSS */}
      <style>
        {`
          /* Clouds */
          .cloud {
            position: absolute;
            top: 20%;
            width: 120px;
            height: 60px;
            background: white;
            border-radius: 50%;
            opacity: 0.8;
          }

          .cloud1 {
            left: -150px;
            animation: cloudMove 40s linear infinite;
          }

          .cloud2 {
            left: -300px;
            top: 35%;
            width: 180px;
            height: 90px;
            animation: cloudMove 60s linear infinite;
          }

          @keyframes cloudMove {
            0% { transform: translateX(0); }
            100% { transform: translateX(120vw); }
          }

          /* Trees */
          .tree {
            width: 50px;
            height: 150px;
            background: linear-gradient(to top, #0b6623, #228b22);
            border-radius: 10px;
            position: relative;
            animation: sway 3s ease-in-out infinite alternate;
          }

          .tree::before {
            content: "";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 80px;
            background: #0b6623;
            border-radius: 50%;
          }

          .tree1 { animation-delay: 0s; }
          .tree2 { animation-delay: 0.5s; }
          .tree3 { animation-delay: 1s; }
          .tree4 { animation-delay: 1.5s; }
          .tree5 { animation-delay: 2s; }

          /* Sway Animation */
          @keyframes sway {
            0% { transform: rotate(-2deg); }
            100% { transform: rotate(2deg); }
          }
        `}
      </style>
    </div>
  );
};

export default IndividualPricing;
