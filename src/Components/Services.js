import React from "react";
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
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#111827" }}>
          Our Delivery Services
        </h2>
        <p style={{ fontSize: "1.05rem", color: "#4b5563", marginTop: "0.5rem" }}>
          We ensure fast, reliable, and secure deliveries across regions, helping businesses reach
          their customers with ease.
        </p>
      </div>

      {/* Collaboration Highlight */}
      <div
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
        <img
          src={chinnamart}
          alt="ChinnaMart"
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
      </div>

      {/* Our Services Grid */}
      <div className="services-grid">
        <div className="service-card">
          <h4>🚚 Fast Delivery</h4>
          <p>Timely doorstep delivery ensuring customer satisfaction every time.</p>
        </div>
        <div className="service-card">
          <h4>📦 Secure Handling</h4>
          <p>Special care for fragile and valuable products during transit.</p>
        </div>
        <div className="service-card">
          <h4>🌍 Wide Reach</h4>
          <p>Expanding delivery coverage across cities and towns.</p>
        </div>
        <div className="service-card">
          <h4>🤝 Trusted Partnership</h4>
          <p>Collaborating with ChinnaMart to deliver quality service nationwide.</p>
        </div>
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
          transition: transform 0.3s, box-shadow 0.3s;
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
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.12);
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
