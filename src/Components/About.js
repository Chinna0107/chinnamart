import React from "react";
import { motion } from "framer-motion";
import ceo from "./chinna3.png";

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
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          flex: "1 1 300px",
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <motion.img
          src={ceo}
          alt="CEO"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
          style={{
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
        />
      </motion.div>

      {/* Right Side: Description */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ flex: "2 1 500px", padding: "0 1rem" }}
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "1rem",
            color: "#111827",
          }}
        >
          About Our Company
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            fontSize: "1.05rem",
            lineHeight: "1.7",
            color: "#4b5563",
          }}
        >
          At <strong>ChinnaMart</strong>, we are taking fresh vegetables and fruits directly from farmers.
          Very soon, our own dairy products will be available too. Until then, we are collaborating
          with trusted partners. Through <strong>ChinnaMart Delivery Partners</strong>, we transport
          fresh vegetables, fruits, dairy products, and <strong>Chinna’s special products</strong> to customers
          safely and efficiently.
          <br />
          <br />
          Our CEO, <strong>Hemanth Kancharla</strong>, started this initiative with passion and dedication.
          He believes that farmers are the real heroes who deserve fair value for their work.
          This project aims to remove middlemen and empower farmers directly.
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
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
          "Look Forward — To Shine, To Be a Leader."
        </motion.blockquote>
      </motion.div>

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
