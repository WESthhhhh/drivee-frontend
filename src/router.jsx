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
import { OffersDataProvider } from './context/fetchOffers.jsx';
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import DrivingSchools from "./pages/DrivingSchools.jsx";
import HowItWorks from './pages/howitWorks.jsx';
import ReservationToPayement from './pages/resevationToPayement.jsx';
import Login from './pages/Auth/LoginPage.jsx';
import SelectUserType from './components/layouts/auth/selectUser.jsx';
import Verification from './pages/Auth/VerificationPage.jsx';
import SchoolSignup from './pages/Auth/SchoolSignup.jsx';
import StudentSignup from './pages/Auth/StudentSignup.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import ResetPassword from './pages/Auth/ResetPassword.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element:(<OffersDataProvider> <HomePage /></OffersDataProvider>)  },
      { path: 'offers', element: (<OffersDataProvider> <OffersPage /></OffersDataProvider>) },
      { path: 'contact', element: <ContactPage /> },
      { path: 'drivingschools', element: <DrivingSchools /> },
      { path: 'howitworks', element: <HowItWorks/> },
      { path: 'reservation', element: <ReservationToPayement/> },
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'select-user', element: <SelectUserType /> },
      { path: 'signup/school', element: <SchoolSignup /> },
      { path: 'signup/student', element: <StudentSignup/> },
      { path: '/verification', element: <Verification /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/reset-password', element: <ResetPassword /> },
    ]
  },
]);