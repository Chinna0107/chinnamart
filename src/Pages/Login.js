import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import config from "./config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.NODE_ENV === 'development' 
      ? config.LOCAL_BASE_URL
      : config.BASE_URL;

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(`${apiUrl}/api/login`, {
      email,
      password,
    });

    if (res.data.token) {
      // check role
      if (res.data.user.is_admin) {
        localStorage.setItem("admintoken", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/admin-dashboard");
        window.location.reload();
      } else {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userEmail", res.data.user.email);
        // localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
        window.location.reload();
      }
    }
  } catch (err) {
    Swal.fire(
      "Error",
      err.response?.data?.message || "Invalid email or password",
      "error"
    );
  }
};


  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Inter, sans-serif",
        padding: "1rem",
      }}
    >
      {/* Transparent Login Box (Responsive) */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          marginLeft: "auto",
          marginRight: "5rem",
          alignSelf: "center",
          width: "350px",
          maxWidth: "100%",
          padding: "2rem",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          color: "#fff",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "0.9rem",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.85)",
              fontSize: "1rem",
              width: "100%",
            }}
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "0.9rem",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.85)",
              fontSize: "1rem",
              width: "100%",
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={{
              padding: "0.9rem",
              border: "none",
              borderRadius: "8px",
              background: "#2563eb",
              color: "#fff",
              fontWeight: "600",
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            Login
          </motion.button>
        </form>

        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.95rem",
            textAlign: "center",
          }}
        >
          Don’t have an account?{" "}
          <a href="/signup" style={{ color: "#93c5fd", fontWeight: "600" }}>
            Sign Up
          </a>
        </p>
      </motion.div>

      {/* Responsive Styling */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="margin-right: 5rem"] {
            margin-right: auto !important;
            margin-left: auto !important;
          }
          h2 {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
