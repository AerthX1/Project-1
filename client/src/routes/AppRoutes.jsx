import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from '../layout/Root';
import Home from '../pages/Home';
import MarketPlace from '../pages/MarketPlace'
import Pricing from '../pages/Pricing';
import Register from '../pages/Register';
import Resource from '../pages/Resource';
import Login from '../pages/Login';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Root />}>
   <Route index element={<Home />} />
   <Route path='home' element={<Home/>}/>  
  <Route path="marketplace" element={<MarketPlace />} />
  <Route path="pricing" element={<Pricing/>}/>
  <Route path="/register" element={<Register/>}/>
   <Route path="/signin" element={<Login />} />
 <Route path="resources" element={<Resource />} />
    </Route>
     </>
  )
);

export default router;