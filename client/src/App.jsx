import React from 'react';
import {RouterProvider} from 'react-router-dom';
import router from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import "./index.css";


const App = () => {
  return (
    <div>
     <Provider store={store}>
     <RouterProvider router={router} />
    </Provider>
    </div>
  )
}

export default App