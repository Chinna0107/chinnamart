import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import config from "../config.js";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    vehicleType: "",
    vehicle_number: "",   // ✅ new field
    password: "",
    confirmPassword: "",
    delivery_area:" "
  });
  const apiUrl = process.env.NODE_ENV === 'development' 
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = fill form, 2 = enter OTP, 3 = verified

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`${apiUrl}/api/send-otp`, {
        email: formData.email,
      });
      alert("OTP sent to your email!");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  // Step 2: Verify OTP
// ✅ UPDATED handleVerifyOtp — Signup will auto-trigger after OTP success

const handleVerifyOtp = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:4000/api/verify-otp", {
      email: formData.email,
      otp,
    });

    if (res.data.token) {
      alert("OTP verified successfully! Completing Signup...");

      // ✅ Auto sign up after OTP verification
      await axios.post("${apiUrl}/api/signup", {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile,
        vehicle_number: formData.vehicleNumber,
        vehicle_type: formData.vehicleType,
        delivery_area: formData.deliveryArea,
      });

      alert("Signup Successful! Please login.");
      window.location.href = "/login"; // redirect to login screen
    }
  } catch (err) {
    alert(err.response?.data?.error || "OTP verification failed");
  }
};



  // Step 3: Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/signup", formData);
      alert("Signup successful! You can now login.");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
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
        backgroundImage:
          "url('https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Inter, sans-serif",
        padding: "1rem",
      }}
    >
      <div
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
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "1.8rem",
            fontWeight: "700",
          }}
        >
          Sign Up
        </h2>

        {step === 1 && (
          <form
            onSubmit={handleSendOtp}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              required
              style={{ ...inputStyle, background: "rgba(255,255,255,0.9)" }}
            >
              <option value="">Select Vehicle Type</option>
              <option value="two-wheeler">Two Wheeler</option>
              <option value="four-wheeler">Four Wheeler</option>
            </select>

            <input
              type="text"
              name="vehicleNumber"
              placeholder="Vehicle Number (e.g. KA-01-AB-1234)"
              value={formData.vehicleNumber}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
             type="text"
             name="deliveryArea"
             placeholder="Delivery Area"
             value={formData.deliveryArea}
             onChange={handleChange}
             required
             style={inputStyle}
             />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            


            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={handleVerifyOtp}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form
            onSubmit={handleSignup}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <p style={{ textAlign: "center" }}>✅ OTP Verified. Complete Signup.</p>
            <button type="submit" style={buttonStyle}>
              Complete Signup
            </button>
          </form>
        )}

        <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.95rem" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#93c5fd", fontWeight: "600" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "0.9rem",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.9)",
  fontSize: "1rem",
  width: "100%",
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
