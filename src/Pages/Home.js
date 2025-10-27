import React from "react";
import { motion } from "framer-motion";
import { Truck, Clock, ShieldCheck, Users } from "lucide-react";

function Home() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f9fafb" }}>
      {/* Hero Section */}
      <section style={heroSection}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={heroContent}
        >
          <h1 style={heroTitle}>
            Deliver Faster, Earn Smarter 🚚
          </h1>
          <p style={heroSubtitle}>
            Join our delivery partner network in collaboration with{" "}
            <span style={{ fontWeight: "600", color: "#2563eb" }}>
              ChinnaMart.in
            </span>{" "}
            and be a part of the future of e-commerce logistics.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="/signup" style={primaryButton}>Get Started</a>
            <a href="/login" style={secondaryButton}>Login</a>
          </div>
        </motion.div>
      </section>

      {/* Features / Stats Section */}
      <section style={statsSection}>
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Truck size={40} color="#2563eb" />
          <h3>10,000+</h3>
          <p>Orders Delivered</p>
        </motion.div>
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Clock size={40} color="#2563eb" />
          <h3>95%</h3>
          <p>On-time Deliveries</p>
        </motion.div>
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ShieldCheck size={40} color="#2563eb" />
          <h3>100%</h3>
          <p>Secure Payments</p>
        </motion.div>
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Users size={40} color="#2563eb" />
          <h3>500+</h3>
          <p>Active Partners</p>
        </motion.div>
      </section>

      {/* Call To Action */}
      <section style={ctaSection}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1rem" }}>
            Ready to Join the Movement?
          </h2>
          <p style={{ fontSize: "1rem", marginBottom: "1.5rem", color: "#4b5563" }}>
            Sign up today and start delivering with{" "}
            <strong>ChinnaMart.in</strong>. Grow your income and be your own boss!
          </p>
          <a href="/signup" style={primaryButton}>Become a Partner</a>
        </motion.div>
      </section>

      {/* Responsive Styling */}
      <style>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem !important;
          }
          h2 {
            font-size: 1.5rem !important;
          }
          .stat-card {
            padding: 1.2rem !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- Styles ---------- */
const heroSection = {
  background: "linear-gradient(135deg, #2563eb, #1e40af)",
  color: "#fff",
  textAlign: "center",
  padding: "6rem 1rem",
};

const heroContent = {
  maxWidth: "800px",
  margin: "0 auto",
};

const heroTitle = {
  fontSize: "3rem",
  fontWeight: "800",
  marginBottom: "1rem",
};

const heroSubtitle = {
  fontSize: "1.2rem",
  marginBottom: "2rem",
  lineHeight: "1.6",
};

const primaryButton = {
  padding: "0.9rem 1.5rem",
  borderRadius: "8px",
  background: "#fff",
  color: "#2563eb",
  fontWeight: "600",
  textDecoration: "none",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
};

const secondaryButton = {
  padding: "0.9rem 1.5rem",
  borderRadius: "8px",
  background: "transparent",
  border: "2px solid #fff",
  color: "#fff",
  fontWeight: "600",
  textDecoration: "none",
};

const statsSection = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "2rem",
  padding: "4rem 1rem",
  maxWidth: "1000px",
  margin: "0 auto",
};

const ctaSection = {
  background: "#f3f4f6",
  textAlign: "center",
  padding: "4rem 1rem",
};

export default Home;
