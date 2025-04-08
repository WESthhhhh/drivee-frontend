// import { createBrowserRouter } from 'react-router-dom';

// import HomePage from "./pages/HomePage.jsx";
// import OffersPage from "./pages/OffersPage.jsx";
// import ContactPage from "./pages/ContactPage.jsx";
// import NotFoundPage from  "./pages/NotFoundPage.jsx"
// import DrivingSchools from "./pages/DrivingSchools.jsx";
// import HowItWorks from './pages/howitWorks.jsx';
// import Login from './pages/Auth/LoginPage.jsx';

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout />,
//     errorElement: <NotFoundPage />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />
//       },
//       {
//         path: 'offers',
//         element: <OffersPage />
//       },
      
      
//       {
//         path: 'contact',
//         element: <ContactPage />
//       },
//       {
//         path: 'drivingschools',
//         element: <DrivingSchools />
//       },
//       {
//         path: 'howitworks',
//         element: <HowItWorks/>
//       },
//       {
//         path: 'login',
//         element: <Login/>
//       },
//     ]
//   }
// ]);



import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './mainLayout.jsx';
import AuthLayout from './authLayout';
// import ProfileLayout from './layouts/profileLayout';
import HomePage from "./pages/HomePage.jsx";
import OffersPage from "./pages/OffersPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import DrivingSchools from "./pages/DrivingSchools.jsx";
import HowItWorks from './pages/howitWorks.jsx';
import Login from './pages/Auth/LoginPage.jsx';
import Signup from './pages/Auth/SignupPage.jsx';
// import Signup from './components/layouts/auth/signupForm.jsx';
import Signup1 from './components/layouts/auth/signupForm1.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'offers', element: <OffersPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'drivingschools', element: <DrivingSchools /> },
      { path: 'howitworks', element: <HowItWorks/> },
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup/signup2', element: <Signup /> },
      { path: 'signup', element: <Signup1 /> },
    ]
  },
]);