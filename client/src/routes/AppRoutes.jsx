import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from '../layout/Root';
import Home from '../pages/Home';
import MarketPlace from '../pages/MarketPlace'
import Pricing from '../pages/Pricing';
import Register from '../pages/Register';
import Resource from '../pages/Resource';
import Login from '../pages/Login';
import Solutions from '../pages/Solutions';
import BusinessSolutions from '../pages/BusinessSolutions';
import IndividualSolutions from '../pages/IndividualSolutions';
import APIIntegration from '../pages/APIIntegration';
import Profile from '../pages/Profile';
import AdminDashboard from '../pages/AdminDashboard';
import AdminRoute from "../components/Admin/AdminRoute";
import RegisterChoice from '../pages/RegisterChoice';
import RegisterIndividual from '../pages/RegisterIndividual';



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Root />}>
   <Route index element={<Home />} />
   <Route path='home' element={<Home/>}/>  
  <Route path="marketplace" element={<MarketPlace />} />
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
    <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

     </>
  )
);

export default router;