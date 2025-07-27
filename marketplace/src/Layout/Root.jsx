import React from "react";
import { Outlet } from 'react-router-dom';
import MarketplaceNavbarControls from '../Components/Header/MarketplaceNavbarControls';
import Footer from '../Components/Footer/Footer';  

const Root = () => {
 
  return (
    <div>
      <MarketplaceNavbarControls />
      <div className="pt-16"> 
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};  

export default Root;
