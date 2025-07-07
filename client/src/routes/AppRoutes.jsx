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
 <Route path="/solutions/business" element={<BusinessSolutions/>}/>
  <Route path="/solutions/individuals" element={<IndividualSolutions/>}/>
    <Route path="/solutions/api" element={<APIIntegration/>}/>

    </Route>
  <Route path="/register-choice" element={<RegisterChoice  />} />
  <Route path="/register" element={<Register/>}/>
  <Route path="/register-individual" element={<RegisterIndividual />} />
   <Route path="/signin" element={<Login />} />
    <Route path='/profile' element={<Profile/>}/>
    <Route path="/help" element={<HelpSupport />} />
    <Route path="/notification" element={<NotificationPage />} />
    <Route path="/about" element={<About />} />
    <Route path="/settings" element={<Settings />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} /> 
     </>
  )
);

export default router;