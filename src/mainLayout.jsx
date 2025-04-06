// RootLayout.jsx
import Navbar from './components/layouts/navbar';
import Footer from './components/layouts/footer';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col  max-w-7xl mx-auto font-poppins">
      <Navbar/>
      
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}