import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import config from "./config";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    vehicleType: "",
    vehicleNumber: "",
    deliveryArea: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? config.LOCAL_BASE_URL
      : config.BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    try {
      await axios.post(`${apiUrl}/api/send-otp`, { email: formData.email });
      Swal.fire("Success", "OTP sent to your email!", "success");
      setStep(2);
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to send OTP",
        "error"
      );
    }
  };

  // Step 2: Verify OTP and Signup
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${apiUrl}/api/verify-otp`, {
        email: formData.email,
        otp,
      });

      if (res.data.token) {
        Swal.fire("Verified", "OTP verified successfully!", "success");

        await axios.post(`${apiUrl}/api/signup`, {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
          vehicle_number: formData.vehicleNumber,
          vehicle_type: formData.vehicleType,
          delivery_area: formData.deliveryArea,
        });

        Swal.fire("Success", "Signup successful! Please login.", "success");
        window.location.href = "/login";
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "OTP verification failed",
        "error"
      );
    }
  };

  return (
    <motion.div
      className="signup-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e3a8a, #2563eb, #60a5fa)",
        fontFamily: "Inter, sans-serif",
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          width: "400px",
          maxWidth: "100%",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          color: "#fff",
        }}
      >
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "1.8rem",
            fontWeight: "700",
          }}
        >
          Sign Up 🚀
        </motion.h2>

        {/* Step 1 - Send OTP */}
        {step === 1 && (
          <motion.form
            onSubmit={handleSendOtp}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <motion.input {...inputMotionProps} type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required style={inputStyle} />
            <motion.input {...inputMotionProps} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
            <motion.input {...inputMotionProps} type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required style={inputStyle} />

            <motion.select {...inputMotionProps} name="vehicleType" value={formData.vehicleType} onChange={handleChange} required style={inputStyle}>
              <option value="">Select Vehicle Type</option>
              <option value="two-wheeler">Two Wheeler</option>
              <option value="four-wheeler">Four Wheeler</option>
            </motion.select>

            <motion.input {...inputMotionProps} type="text" name="vehicleNumber" placeholder="Vehicle Number (e.g. KA-01-AB-1234)" value={formData.vehicleNumber} onChange={handleChange} required style={inputStyle} />
            <motion.input {...inputMotionProps} type="text" name="deliveryArea" placeholder="Delivery Area" value={formData.deliveryArea} onChange={handleChange} required style={inputStyle} />
            <motion.input {...inputMotionProps} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={inputStyle} />
            <motion.input {...inputMotionProps} type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required style={inputStyle} />

            <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }} style={buttonStyle}>
              Send OTP
            </motion.button>
          </motion.form>
        )}

        {/* Step 2 - Verify OTP */}
        {step === 2 && (
          <motion.form
            onSubmit={handleVerifyOtp}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <motion.input
              {...inputMotionProps}
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={inputStyle}
            />

            <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }} style={buttonStyle}>
              Verify OTP
            </motion.button>
          </motion.form>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.95rem" }}
        >
          Already have an account?{" "}
          <a href="/login" style={{ color: "#93c5fd", fontWeight: "600" }}>
            Login
          </a>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

const inputMotionProps = {
  whileFocus: { scale: 1.02 },
  transition: { duration: 0.2 },
};

const inputStyle = {
  padding: "0.9rem",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.9)",
  fontSize: "1rem",
  width: "100%",
  color: "#000",
};

const buttonStyle = {
  padding: "0.9rem",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "1rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
};

export default SignUp;
