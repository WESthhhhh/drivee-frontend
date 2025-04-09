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
import SelectUserType from './components/layouts/auth/selectUser.jsx';
import Verification from './pages/Auth/VerificationPage.jsx';
import SchoolSignup from './pages/Auth/SchoolSignup.jsx';
import StudentSignup from './pages/Auth/StudentSignup.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';

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
      // { path: 'signup', element: <Signup /> },
      { path: 'select-user', element: <SelectUserType /> },
      { path: 'signup/school', element: <SchoolSignup /> },
      { path: 'signup/student', element: <StudentSignup/> },
      { path: '/signup/school/verification', element: <Verification /> },
      { path: '/forgotPassword', element: <ForgotPassword /> },

    ]
  },
]);