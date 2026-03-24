import React from "react";
import { Link, useLocation } from "react-router";

const Navbar: React.FC = () => {
  const location = useLocation();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg text-sm font-medium ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      
      {/* logo */}
      <h1 className="text-lg font-semibold text-gray-900">Vi Notes</h1>

      {/* Links */}
      <div className="flex gap-3">
        <Link to="/login" className={linkClass("/login")}>
          Login
        </Link>

        <Link to="/register" className={linkClass("/register")}>
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;