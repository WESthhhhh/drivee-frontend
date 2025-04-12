import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
//import { router } from './router';
import './index.css';
import ReservationToPayement from './pages/resevationToPayement'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   {/** <RouterProvider router={router} /> */} 
<ReservationToPayement/>
  </React.StrictMode>
);