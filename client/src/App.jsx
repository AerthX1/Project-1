import React from 'react';
import {RouterProvider} from 'react-router-dom';
import router from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from '../../shared-redux/src/store';
import AppWrapper from "../../shared-redux/src/components/AppWrapper";
import "./index.css";


const App = () => {
  return (
     <Provider store={store}>
          <AppWrapper>
     <RouterProvider router={router} />
     </AppWrapper>
    </Provider>
  )
}

export default App