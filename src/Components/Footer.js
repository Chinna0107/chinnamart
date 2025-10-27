import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer
      style={{
        background: "#111827",
        color: "#d1d5db",
        padding: "2rem 1rem",
        marginTop: "2rem",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div className="footer-container">
        {/* Brand Info */}
        <div>
          <h2 style={{ color: "#1a5ce1ff", fontSize: "1.5rem", fontWeight: "700" }}>
            ChinnaMart - Delivery Partners 🚚 
          </h2>
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.95rem",
              lineHeight: "1.5",
            }}
          >
            Building modern solutions for everyday problems.  
            Your trusted partner in innovation.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            style={{
              color: "#57d928ff",
              fontSize: "1.2rem",
              marginBottom: "1rem",
            }}
          >
            Quick Links
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              lineHeight: "2",
            }}
          >
            <li>
              <a href="/home" style={linkStyle}>
                Home
              </a>
            </li>
            <li>
              <a href="/about" style={linkStyle}>
                About
              </a>
            </li>
            <li>
              <a href="/services" style={linkStyle}>
                Services
              </a>
            </li>
            <li>
              <a href="/contact" style={linkStyle}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources / Policies */}
        <div>
          <h3
            style={{
              color: "#0fcec4ff",
              fontSize: "1.2rem",
              marginBottom: "1rem",
            }}
          >
            Resources
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              lineHeight: "2",
            }}
          >
            <li>
              <a href="/terms" style={linkStyle}>
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/faq" style={linkStyle}>
                FAQs
              </a>
            </li>
            <li>
              <a href="/privacy" style={linkStyle}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/payments" style={linkStyle}>
                Payments Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3
            style={{
              color: "#d48932ff",
              fontSize: "1.2rem",
              marginBottom: "1rem",
            }}
          >
            Follow Us
          </h3>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-start",
            }}
          >
            <a href="https://x.com/kancharlaHeman4" style={iconStyle}>
              <FaTwitter />
            </a>
            <a href="https://www.facebook.com/hemanth.kancharla.31" style={iconStyle}>
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/hemanth_chowdary__775/" style={iconStyle}>
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/chinnamart-the-startup-%E2%9C%A8-b07878379/" style={iconStyle}>
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid #374151",
          marginTop: "2rem",
          paddingTop: "1rem",
          textAlign: "center",
          fontSize: "0.9rem",
          color: "#9ca3af",
        }}
      >
        © {new Date().getFullYear()} MyBrand. All rights reserved.
      </div>

      {/* Responsive Styling */}
      <style>{`
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
        }
        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-container div {
            margin-bottom: 1rem;
          }
          .footer-container ul {
            padding: 0;
          }
          .footer-container ul li {
            margin: 0.5rem 0;
          }
          .footer-container div:last-child {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}

const linkStyle = {
  color: "#d1d5db",
  textDecoration: "none",
  fontSize: "0.95rem",
};
const iconStyle = {
  fontSize: "1.5rem",
  color: "#d1d5db",
  textDecoration: "none",
  transition: "color 0.3s",
};

export default Footer;
