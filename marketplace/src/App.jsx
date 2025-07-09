import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from '../../shared-redux/src/store';
import './index.css';

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
