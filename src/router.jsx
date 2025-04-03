import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './rootLayout';
import HomePage from "./pages/HomePage.jsx";
import OffersPage from "./pages/OffersPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from  "./pages/NotFoundPage.jsx"
import DrivingSchools from "./pages/DrivingSchools.jsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'offers',
        element: <OffersPage />
      },
      
      
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'drivingschools',
        element: <DrivingSchools />
      },
     
      // Add more routes as needed
    ]
  }
]);