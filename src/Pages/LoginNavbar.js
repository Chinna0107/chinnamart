import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DashboardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header
      style={{
        background: "#2563eb",
        color: "#fff",
        padding: "0.8rem 1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo / Brand */}
      <div style={{ fontSize: "1.2rem", fontWeight: "700" }}>ChinnaMart</div>

      {/* Desktop Nav */}
      <nav className="desktop-nav">
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <a href="/dashboard" style={navLink}>
              Dashboard
            </a>
          </li>
          <li>
            <a href="/orders" style={navLink}>
              Orders
            </a>
          </li>
          <li>
            <a href="/wallet" style={navLink}>
              Wallet
            </a>
          </li>
        </ul>
      </nav>

      {/* Right Section (Wallet + Profile) */}
      <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Wallet */}
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            padding: "0.3rem 0.7rem",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "0.95rem",
          }}
        >
          ₹ 2,450
        </div>

        {/* Profile */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "#fff",
              color: "#2563eb",
              fontWeight: "700",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              userSelect: "none",
              fontSize: "0.9rem",
            }}
          >
            CM
          </div>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  right: 0,
                  marginTop: "0.5rem",
                  background: "#fff",
                  color: "#333",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  overflow: "hidden",
                  minWidth: "170px",
                  zIndex: 2000,
                }}
              >
                <a href="/profile" style={dropdownItem}>
                  Profile
                </a>
                <a href="/terms" style={dropdownItem}>
                  Terms & Conditions
                </a>
                <button
                  onClick={handleLogout}
                  style={{
                    ...dropdownItem,
                    border: "none",
                    background: "none",
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <div
        className="mobile-nav-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: "none", fontSize: "1.6rem", cursor: "pointer" }}
      >
        ☰
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              top: "56px",
              left: 0,
              right: 0,
              background: "#2563eb",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <a href="/dashboard" style={mobileLink}>
              Dashboard
            </a>
            <a href="/orders" style={mobileLink}>
              Orders
            </a>
            <a href="/wallet" style={mobileLink}>
              Wallet
            </a>
            <a href="/profile" style={mobileLink}>
              Profile
            </a>
            <a href="/terms" style={mobileLink}>
              Terms & Conditions
            </a>
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "0.6rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Styling */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: block !important;
          }
          header {
            padding: 0.8rem 1rem !important;
          }
        }
      `}</style>
    </header>
  );
}

const navLink = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
};

const mobileLink = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: "600",
};

const dropdownItem = {
  display: "block",
  padding: "0.7rem 1rem",
  textDecoration: "none",
  color: "#333",
  fontSize: "0.95rem",
  fontWeight: "500",
  transition: "background 0.2s",
};

export default DashboardHeader;
