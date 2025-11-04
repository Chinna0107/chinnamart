import React from "react";
import { motion } from "framer-motion";
import chinnamart from "./ChinnaMart.png";

function Services() {
  return (
    <section
      style={{
        padding: "3rem 2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#111827" }}>
          Our Delivery Services
        </h2>
        <p style={{ fontSize: "1.05rem", color: "#4b5563", marginTop: "0.5rem" }}>
          We ensure fast, reliable, and secure deliveries across regions, helping businesses reach
          their customers with ease.
        </p>
      </motion.div>

      {/* Collaboration Highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9fafb",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          marginBottom: "2.5rem",
        }}
      >
        <motion.img
          src={chinnamart}
          alt="ChinnaMart"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          style={{
            width: "160px",
            height: "auto",
            marginBottom: "1rem",
            marginRight: "2rem",
          }}
        />
        <div style={{ maxWidth: "600px" }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#111827" }}>
            Proud Partner of ChinnaMart
          </h3>
          <p style={{ fontSize: "1rem", color: "#4b5563", marginTop: "0.5rem" }}>
            We have partnered with <strong>ChinnaMart.in</strong>, a leading e-commerce platform, to
            ensure that customers receive their orders safely and on time. Our delivery network is
            designed to handle high volumes while maintaining speed and quality.
          </p>
        </div>
      </motion.div>

      {/* Our Services Grid */}
      <div className="services-grid">
        {[
          { title: "🚚 Fast Delivery", desc: "Timely doorstep delivery ensuring customer satisfaction every time." },
          { title: "📦 Secure Handling", desc: "Special care for fragile and valuable products during transit." },
          { title: "🌍 Wide Reach", desc: "Expanding delivery coverage across cities and towns." },
          { title: "🤝 Trusted Partnership", desc: "Collaborating with ChinnaMart to deliver quality service nationwide." },
        ].map((service, index) => (
          <motion.div
            key={index}
            className="service-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
            }}
            viewport={{ once: true }}
          >
            <h4>{service.title}</h4>
            <p>{service.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Responsive Styling */}
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        .service-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          text-align: center;
        }
        .service-card h4 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.5rem;
        }
        .service-card p {
          font-size: 0.95rem;
          color: #4b5563;
        }
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

export default Services;
