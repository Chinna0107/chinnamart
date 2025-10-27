import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#2563eb",
          }}
        >
          ChinnaMart - Delivery Partners
        </div>

        {/* Desktop Navigation */}
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
              <a href="/" style={{ textDecoration: "none", color: "#333" }}>
                Home
              </a>
            </li>
            <li>
              <a href="/about" style={{ textDecoration: "none", color: "#333" }}>
                About
              </a>
            </li>
            <li>
              <a href="/services" style={{ textDecoration: "none", color: "#333" }}>
                Services
              </a>
            </li>
            <li>
              <a href="/contact" style={{ textDecoration: "none", color: "#333" }}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="desktop-nav" style={{ display: "flex", gap: "1rem" }}>
          <a
            href="/login"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #2563eb",
              background: "transparent",
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login
          </a>
          <a
            href="/signup"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "none",
              background: "#2563eb",
              color: "#fff",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Sign Up
          </a>
        </div>

        {/* Hamburger for Mobile */}
        <div
          className="mobile-nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            cursor: "pointer",
            fontSize: "1.8rem",
            fontWeight: "bold",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </div>
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
              background: "#ffffff",
              padding: "1rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <a href="/" style={mobileLinkStyle}>
              Home
            </a>
            <a href="/about" style={mobileLinkStyle}>
              About
            </a>
            <a href="/services" style={mobileLinkStyle}>
              Services
            </a>
            <a href="/contact" style={mobileLinkStyle}>
              Contact
            </a>
            <a href="/login" style={{ ...mobileBtnStyle, border: "1px solid #2563eb", color: "#2563eb" }}>
              Login
            </a>
            <a href="/signup" style={{ ...mobileBtnStyle, background: "#2563eb", color: "#fff" }}>
              Sign Up
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Styling */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}

// Styles for mobile menu links
const mobileLinkStyle = {
  textDecoration: "none",
  color: "#333",
  fontSize: "1.1rem",
  padding: "0.5rem 0",
};

const mobileBtnStyle = {
  padding: "0.8rem",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "600",
  textAlign: "center",
};

export default Header;
