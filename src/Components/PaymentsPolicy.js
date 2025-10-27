import React from "react";
import { CreditCard } from "lucide-react";
import { motion } from "framer-motion";

function PaymentsPolicy() {
  return (
    <div style={pageStyle}>
      {/* Hero Section */}
      <motion.div
        style={heroStyle}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <CreditCard style={{ width: "50px", height: "50px", color: "#fff" }} />
        <h1 style={heroTitle}>Payments Policy</h1>
        <p style={heroSubtitle}>
          Secure, transparent, and reliable payment practices for our delivery partners.
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
    title: "1. Payment Methods",
    text: "We support multiple secure payment methods including UPI, bank transfers, debit/credit cards, and digital wallets. All transactions are encrypted for safety.",
  },
  {
    title: "2. Partner Payouts",
    text: "Delivery partners receive payouts on a weekly basis. Payments are processed directly to the registered bank account provided during onboarding.",
  },
  {
    title: "3. Deductions & Fees",
    text: "Service fees or applicable charges (like platform commissions) are deducted before payouts. These details are transparently shared in your wallet dashboard.",
  },
  {
    title: "4. Refunds & Adjustments",
    text: "Refunds for customers, if applicable, are handled by our partner e-commerce platform (Chinnamart.in). Any adjustments in earnings will be reflected in your wallet.",
  },
  {
    title: "5. Late Payments",
    text: "In rare cases of banking delays, payouts may take additional 2-3 business days. You will be notified via email or app notifications.",
  },
  {
    title: "6. Contact & Support",
    text: "For any payment-related issues, contact our support team via the in-app help center or email at support@deliveryapp.com.",
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
  background: "linear-gradient(135deg, #16a34a, #065f46)",
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
  color: "#16a34a",
};

const sectionText = {
  fontSize: "1rem",
  lineHeight: "1.6",
  color: "#374151",
};

export default PaymentsPolicy;
