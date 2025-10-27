import React from "react";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

function PrivacyPolicy() {
  return (
    <div style={pageStyle}>
      {/* Hero Section */}
      <motion.div
        style={heroStyle}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Shield style={{ width: "50px", height: "50px", color: "#fff" }} />
        <h1 style={heroTitle}>Privacy Policy</h1>
        <p style={heroSubtitle}>
          Your privacy is important to us. Learn how we protect and use your data.
        </p>
      </motion.div>

      {/* Content Section */}
      <div style={contentWrapper}>
        {sections.map((section, index) => (
          <motion.section
            key={index}
            style={sectionStyle}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
            viewport={{ once: true }}
          >
            <h2 style={sectionTitle}>{section.title}</h2>
            <p style={sectionText}>{section.text}</p>
          </motion.section>
        ))}
      </div>

      {/* Responsive Styling */}
      <style>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 1.7rem !important;
          }
          h2 {
            font-size: 1.15rem !important;
          }
          div[style*="maxWidth: 900px"] {
            padding: 1.2rem !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- Sections Data ---------- */
const sections = [
  {
    title: "1. Information We Collect",
    text: "We collect personal details such as your name, email, mobile number, and vehicle information during registration. We may also collect location data when you are delivering products.",
  },
  {
    title: "2. How We Use Your Information",
    text: "Your data is used to verify your identity, process deliveries, send notifications, provide support, and improve our services. We never sell your data to third parties.",
  },
  {
    title: "3. Data Security",
    text: "We implement strict security measures to protect your data from unauthorized access, alteration, or disclosure. However, no system is completely secure, and we encourage you to maintain safe practices.",
  },
  {
    title: "4. Sharing of Information",
    text: "We may share your data with trusted partners like Chinnamart.in for delivery operations. This sharing is strictly limited to operational purposes.",
  },
  {
    title: "5. Your Rights",
    text: "You have the right to access, update, or delete your personal data. Contact our support team for assistance with privacy-related requests.",
  },
  {
    title: "6. Updates to this Policy",
    text: "We may update this Privacy Policy from time to time. Changes will be notified through the app or email.",
  },
];

/* ---------- Styles ---------- */
const pageStyle = {
  background: "linear-gradient(to bottom right, #f9fafb, #f3f4f6)",
  minHeight: "100vh",
  fontFamily: "Inter, sans-serif",
  color: "#111827",
};

const heroStyle = {
  background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
  padding: "3rem 1rem",
  textAlign: "center",
  color: "#fff",
  borderBottomLeftRadius: "20px",
  borderBottomRightRadius: "20px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
};

const heroTitle = {
  fontSize: "2.4rem",
  fontWeight: "700",
  margin: "1rem 0 0.5rem",
  letterSpacing: "0.5px",
};

const heroSubtitle = {
  fontSize: "1.15rem",
  opacity: "0.95",
};

const contentWrapper = {
  maxWidth: "900px",
  margin: "2rem auto",
  padding: "2rem",
  borderRadius: "20px",
};

const sectionStyle = {
  background: "#fff",
  marginBottom: "1.8rem",
  padding: "1.5rem",
  borderRadius: "14px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease",
};

const sectionTitle = {
  fontSize: "1.4rem",
  fontWeight: "600",
  marginBottom: "0.5rem",
  color: "#2563eb",
};

const sectionText = {
  fontSize: "1rem",
  lineHeight: "1.6",
  color: "#374151",
};

export default PrivacyPolicy;
