import React from "react";
import ceo from "./chinna3.png"

function About() {
  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Left Side: CEO Image */}
      <div
        style={{
          flex: "1 1 300px",
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <img
          src={ceo}
          alt="CEO"
          style={{
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
        />
      </div>

      {/* Right Side: Description */}
      <div style={{ flex: "2 1 500px", padding: "0 1rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1rem", color: "#111827" }}>
          About Our Company
        </h2>
        <p style={{ fontSize: "1.05rem", lineHeight: "1.7", color: "#4b5563" }}>
          At <strong>ChinnaMart</strong>, We are taking fresh vegetables and fruits from the farmers . As sson as possible the diary productss are also coming from our own brand . Until then we are moving with the outers .By this ChinnaMart Delivery Partners we are transporting the fresh vegetables,fruits,diary products and some chinna's special products to the customer.    
          <br /><br />
          Our CEO, <strong>HEMANTH KANCHARLA</strong>,started this with great passion and dedication. He believes that the farmer is the one who is responsible and didn't think for the profits.
          This project is started to support the farmers from the middle persons .
        </p>

        <blockquote
          style={{
            marginTop: "1.5rem",
            padding: "1rem 1.5rem",
            borderLeft: "4px solid #2563eb",
            background: "#f3f4f6",
            fontStyle: "italic",
            color: "#374151",
            borderRadius: "6px",
          }}
        >
          "Look Forward - To Shine to be a Leader"
        </blockquote>
      </div>

      {/* Responsive Styling */}
      <style>{`
        @media (max-width: 768px) {
          section {
            flex-direction: column;
            text-align: center;
          }
          section div {
            padding: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

export default About;
