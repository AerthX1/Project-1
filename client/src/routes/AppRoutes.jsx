import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from '../layout/Root';
import Home from '../pages/Home';
import MarketPlace from '../pages/MarketPlace'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
   <Route index element={<Home />} />
   <Route path='home' element={<Home/>}/>  
  <Route path="marketplace" element={<MarketPlace />} />
    </Route>
  )
);

export default router;