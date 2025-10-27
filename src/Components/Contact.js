import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../Pages/config";

function Contact() {
  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form[0].value;
    const email = form[1].value;
    const message = form[2].value;
    const apiUrl = process.env.NODE_ENV === 'development' 
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

    try {
      const res = await axios.post(`${apiUrl}/api/contact`, {
        name,
        email,
        message,
      });

      Swal.fire("✅ Success", res.data.message, "success");
      form.reset();
    } catch (err) {
      Swal.fire(
        "❌ Error",
        err.response?.data?.message || "Failed to send message",
        "error"
      );
    }
  };

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
        style={{ textAlign: "center", marginBottom: "2rem" }}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#111827" }}>
          Contact Us
        </h2>
        <p
          style={{ fontSize: "1.05rem", color: "#4b5563", marginTop: "0.5rem" }}
        >
          Have questions or need assistance? Reach out to us anytime.
        </p>
      </motion.div>

      <div className="contact-grid">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: "#ffffff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Your Name"
            required
            style={inputStyle}
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Your Email"
            required
            style={inputStyle}
          />
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            placeholder="Your Message"
            rows="5"
            required
            style={{ ...inputStyle, resize: "none" }}
          ></motion.textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "0.9rem",
              fontWeight: "600",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            Send Message
          </motion.button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: "#f9fafb",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#111827",
            }}
          >
            Get In Touch
          </h3>
          <p style={{ marginBottom: "1rem", color: "#4b5563" }}>
            We’d love to hear from you. Whether you have a question about
            services, pricing, or anything else, our team is ready to answer all
            your questions.
          </p>
          <p>
            <strong>📍 Address:</strong> Nekunam Puram , Voletivari Palem(mandal) , SPSR NELLORE (Dist) , AP , INDIA
          </p>
          <p>
            <strong>📞 Phone:</strong> +91 81798 60935
          </p>
          <p>
            <strong>✉️ Email:</strong> chinnamart0107@gmail.com
          </p>
        </motion.div>
      </div>

      {/* Responsive Styling */}
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        form button:hover {
          background: #1e40af;
        }
      `}</style>
    </section>
  );
}

const inputStyle = {
  padding: "0.9rem",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "1rem",
};

export default Contact;
