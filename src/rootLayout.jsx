// RootLayout.jsx
import Navbar from './components/layouts/navbar';
import Footer from './components/layouts/footer';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col font-poppins max-w-7xl mx-auto">
      {/* 1. Navbar appears on every page */}
      <Navbar />
      
      {/* 2. Dynamic content area */}
      <main className="flex-1 p-4">
        <Outlet /> {/* This changes based on URL */}
      </main>
      
      {/* 3. Footer appears on every page */}
      <Footer />
    </div>
  );
}