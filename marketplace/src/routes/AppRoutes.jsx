import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from '../Layout/Root';
import MarketplacePage from '../pages/MarketplacePage';
import RegisterChoice from '../pages/RegisterChoice';
import Login from '../pages/Login';
import MarketPlace from '../pages/MarketPlace';
import SingleProject from '../pages/SingleProject';
import PaymentPage from '../pages/PaymentPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index element={<MarketplacePage />} />
        <Route path="marketplace" element={<MarketPlace />} />
        <Route path="/project/:id" element={<SingleProject />} />

      </Route>

      <Route path="/register-choice" element={<RegisterChoice />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/payment/:id" element={<PaymentPage />} />
    </>
  )
);

export default router;
