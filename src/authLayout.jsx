// layouts/AuthLayout.jsx (for login/register)
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light p-4 font-poppins">
      <div className="w-full ">
        <Outlet />
      </div>
    </div>
  );
}