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
import ProfileLayout from './profileLayout';
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
import ManageOffers from './pages/profiles/manageOffers.jsx';
import SchoolReservations from './pages/profiles/schoolReservations.jsx';
import SchoolReviews from './pages/profiles/schoolReviews.jsx';
import SchoolInfo from './pages/profiles/schoolInfo.jsx';
import Userinfo from './pages/profiles/userInfo.jsx';
import MyReservations from './pages/profiles/PurchasedOffers.jsx';
import MyReviews from './pages/profiles/reviewsUser.jsx';
import ManageSchools from './pages/profiles/manageSchools.jsx';
import ManageUsers from './pages/profiles/manageUsers.jsx';
import Admininfo from './pages/profiles/adminInfo.jsx';
import AdminOffers from './pages/profiles/manageOffersAdmin.jsx';
import ProfileSchool from './pages/profileSchool.jsx';
import AdminReservations from './pages/profiles/adminReservations.jsx';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true , element:(<OffersDataProvider> <HomePage /></OffersDataProvider>)  },
      { path: 'home' , element:(<OffersDataProvider> <HomePage /></OffersDataProvider>)  },
      { path: 'offers', element: (<OffersDataProvider> <OffersPage /></OffersDataProvider>) },
      { path: 'contact', element: <ContactPage /> },
      { path: 'drivingschools', element: <DrivingSchools /> },
      { path: 'howitworks', element: <HowItWorks/> },
      { path: 'reservation/:id', element: <ReservationToPayement/> },
      { path: 'reservation', element: <ReservationToPayement/> },
      { path: 'profile', element: <ProfileSchool/> },
      // { 
      //   path: 'my-reservations', 
      //   element: <UserReservationsPage/>,
      //   loader: async () => {
      //     const reservations = await fetchUserReservations();
      //     return { reservations };
      //   }
      // }
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
  {
    element: <ProfileLayout />,
    children: [
      // { path: 'offers-management', element: <ManageOffers /> },
      { path: 'school-reservation', element: <SchoolReservations /> },
      { path: 'school-review', element: <SchoolReviews /> },
      { path: 'school-info', element: <SchoolInfo /> },
      { path: 'offers-management', element: <ManageOffers /> },
      { path: 'school-reservation', element: <SchoolReservations /> },
      { path: 'school-review', element: <SchoolReviews /> },
      { path: 'user-info', element: <Userinfo /> },
      { path: 'user-offers', element: <MyReservations /> },
      { path: 'user-reviews', element: <MyReviews /> },
      { path: 'admin-schools', element: <ManageSchools /> },
      { path: 'admin-users', element: <ManageUsers /> },
      { path: 'admin-info', element: <Admininfo /> },
      { path: 'admin-offers', element: <AdminOffers /> },
      { path: 'admin-reservations', element: <AdminReservations /> },
    ]

  },
]);