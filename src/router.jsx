import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import HomePage from "./pages/HomePage.jsx";
import OffersPage from "./pages/OffersPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from  "./pages/NotFoundPage.jsx"

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
     
      // Add more routes as needed
    ]
  }
]);