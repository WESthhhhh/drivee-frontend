// RootLayout.jsx
import Navbar from './components/layouts/navbar';
import ScrollToTop from './components/scrollToTop';
import Footer from './components/layouts/footer';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col font-poppins">
    <ScrollToTop />
    <div className="w-full">
      <div className="max-w-8xl mx-auto">
        <Navbar/>
      </div>
    </div>
    
    <div className="flex-1 max-w-8xl w-full mx-auto ">
      <main>
        <Outlet />
      </main>
    </div>

    <Footer />
  </div>
  );
}