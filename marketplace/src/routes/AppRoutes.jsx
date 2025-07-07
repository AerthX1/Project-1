import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from '../Layout/Root';
import MarketplacePage from '../pages/MarketplacePage';
import RegisterChoice from '../pages/RegisterChoice';
import Login from '../pages/Login';
import MarketPlace from '../pages/MarketPlace';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index element={<MarketplacePage />} />
        <Route path="marketplace" element={<MarketPlace />} />
      </Route>

      <Route path="/register-choice" element={<RegisterChoice />} />
      <Route path="/signin" element={<Login />} />
    </>
  )
);

export default router;
