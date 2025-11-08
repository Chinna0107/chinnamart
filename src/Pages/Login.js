import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import config from "../Pages/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.NODE_ENV === "development"
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
        if (res.data.user.is_admin) {
          localStorage.setItem("admintoken", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/admin-dashboard");
          window.location.reload();
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userEmail", res.data.user.email);
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
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e3a8a, #2563eb, #60a5fa)",
        fontFamily: "Inter, sans-serif",
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
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
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Login
        </motion.h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <motion.input
            whileFocus={{ scale: 1.03 }}
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
            whileFocus={{ scale: 1.03 }}
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
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
        </motion.p>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          h2 {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
