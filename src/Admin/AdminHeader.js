import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBox, FaUserCircle, FaMoneyBill, FaSignOutAlt, FaBars } from "react-icons/fa";

function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Brand Logo */}
        <h1 className="text-xl font-bold">Admin Panel</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/admin/orders" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaBox /> Orders
          </Link>
          <Link to="/admin/payments" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaMoneyBill /> Payments
          </Link>
          <Link to="/admin/profile" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaUserCircle /> Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:text-red-400 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-2xl">
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
