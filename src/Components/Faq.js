import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I become a delivery partner?",
      answer:
        "You can register through our Sign-Up page by providing your details, uploading the required documents, and verifying your vehicle information. Once approved, you can start delivering.",
    },
    {
      question: "When will I receive my payments?",
      answer:
        "Payments are credited to your wallet after each successful delivery. You can request a bank transfer as per the weekly payout schedule.",
    },
    {
      question: "Do I need to own a vehicle?",
      answer:
        "Yes, you must own or have access to a two-wheeler or four-wheeler with valid registration and insurance.",
    },
    {
      question: "What if an order gets delayed?",
      answer:
        "Always communicate through the app if you anticipate delays. Repeated delays may affect your ratings and incentives.",
    },
    {
      question: "Is there customer support available?",
      answer:
        "Yes, our support team is available 24/7 through the app’s Help & Support section.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={pageStyle}>
      {/* Hero Section */}
      <div style={heroStyle}>
        <HelpCircle style={{ width: "40px", height: "40px", color: "#fff" }} />
        <h1 style={heroTitle}>Frequently Asked Questions</h1>
        <p style={heroSubtitle}>
          Answers to common queries from our delivery partners.
        </p>
      </div>

      {/* FAQ Section */}
      <div style={faqContainer}>
        {faqs.map((faq, index) => (
          <div key={index} style={faqCard}>
            <button
              onClick={() => toggleFAQ(index)}
              style={faqHeader}
            >
              <span style={faqQuestion}>{faq.question}</span>
              {activeIndex === index ? (
                <ChevronUp style={{ color: "#2563eb" }} />
              ) : (
                <ChevronDown style={{ color: "#2563eb" }} />
              )}
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={faqAnswer}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Responsive Styling */}
      <style>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem !important;
          }
          div[style*="maxWidth: 800px"] {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- Styles ---------- */
const pageStyle = {
  background: "#f9fafb",
  minHeight: "100vh",
  fontFamily: "Inter, sans-serif",
};

const heroStyle = {
  background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
  padding: "3rem 1rem",
  textAlign: "center",
  color: "#fff",
};

const heroTitle = {
  fontSize: "2.2rem",
  fontWeight: "700",
  margin: "1rem 0 0.5rem",
};

const heroSubtitle = {
  fontSize: "1.1rem",
  opacity: "0.9",
};

const faqContainer = {
  maxWidth: "800px",
  margin: "2rem auto",
  padding: "2rem",
  background: "#fff",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};

const faqCard = {
  marginBottom: "1rem",
  borderBottom: "1px solid #e5e7eb",
};

const faqHeader = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "none",
  border: "none",
  outline: "none",
  cursor: "pointer",
  padding: "1rem 0",
  fontSize: "1rem",
  fontWeight: "600",
  textAlign: "left",
};

const faqQuestion = {
  color: "#111827",
};

const faqAnswer = {
  padding: "0.5rem 0 1rem",
  color: "#374151",
  lineHeight: "1.6",
};
