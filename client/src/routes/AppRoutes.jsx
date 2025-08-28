import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from '../layout/Root';
import Home from '../pages/Home';
import MarketplaceHero from '../pages/MarketplaceHero'
import Pricing from '../pages/Pricing';
import Register from '../pages/Register';
import Resource from '../pages/Resource';
import Login from '../pages/Login';
import Solutions from '../pages/Solutions';
import BusinessSolutions from '../pages/BusinessSolutions';
import IndividualSolutions from '../pages/IndividualSolutions';
import APIIntegration from '../pages/APIIntegration';
import Profile from '../pages/Profile';
import RegisterIndividual from '../pages/RegisterIndividual';
import ForgotPassword from '../pages/ForgotPassword';
import HelpSupport from '../pages/HelpSupport';
import NotificationPage from '../pages/NotificationPage';
import About from '../pages/About';
import Settings from '../pages/Settings';
import RegisterChoice from "../pages/RegisterChoice"
import AdminDashboard from "../../../admin-frontend/src/pages/AdminDashboard";
import AdminRoute from "../../../admin-frontend/src/components/Admin/AdminRoute";
import Services from '../pages/Services';
import VerifyOtp from '../pages/VerifyOtp';
import ContactUs from '../pages/ContactUs';
import DashboardLayout from '../pages/DashboardLayout';
import Overview from '../components/Dashboard/Overview';
import Certificates from '../components/Dashboard/Certificates';
import Transactions from '../components/Dashboard/Transactions';
import Marketplace from '../components/Dashboard/Marketplace';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Root />}>
   <Route index element={<Home />} />
   <Route path='home' element={<Home/>}/>  
  <Route path="MarketplaceHero" element={<MarketplaceHero />} />
  <Route path="pricing" element={<Pricing/>}/>
 <Route path="resources" element={<Resource />} />
 <Route path="solutions" element={<Solutions/>}/>
 <Route path="services" element={<Services/>}/>
 <Route path="/solutions/business" element={<BusinessSolutions/>}/>
  <Route path="/solutions/individuals" element={<IndividualSolutions/>}/>
    <Route path="/solutions/api" element={<APIIntegration/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>

    </Route>
  <Route path="/register-choice" element={<RegisterChoice  />} />
  <Route path="/register" element={<Register/>}/>
  <Route path="/register-individual" element={<RegisterIndividual />} />
  <Route path="/verify-otp" element={<VerifyOtp />} />
   <Route path="/signin" element={<Login />} />
    <Route path='/profile' element={<Profile/>}/>
    <Route path="/help" element={<HelpSupport />} />
    <Route path="/notification" element={<NotificationPage />} />
    <Route path="/about" element={<About />} />
    <Route path="/settings" element={<Settings />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} /> 
      <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="overview" element={<Overview />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="marketplace" element={<Marketplace />} />
        </Route>
     </>
  )
);

export default router;