import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("admintoken");
        const res = await fetch("http://localhost:4000/api/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div style={loadingStyle}>Loading profile...</div>;
  }

  if (!user) {
    return <div style={loadingStyle}>No profile data found</div>;
  }

  return (
    <div style={pageStyle}>
      <motion.div
        style={cardStyle}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 style={headingStyle}>👤 My Profile</h2>

        <div style={infoContainer}>
          <Info label="Full Name" value={user.name} />
          <Info label="Email" value={user.email} />
          <Info label="Vehicle Number" value={user.vehicle_number} />
          <Info label="User ID" value={user.id} />
          {/* <Info label="Created On" value={new Date(user.date_created).toDateString()} /> */}
          <Info label="Role" value={user.is_admin ? "Admin" : "Delivery User"} />
        </div>
      </motion.div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <motion.div
      style={infoBox}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <strong style={labelStyle}>{label}:</strong>
      <p style={valueStyle}>{value}</p>
    </motion.div>
  );
}

/* ---------- Styles ---------- */
// same styles you added:
const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #2ceb25ff, #7715daff, #741dc4ff)",
  fontFamily: "Inter, sans-serif",
  padding: "1rem",
};

const cardStyle = {
  maxWidth: "420px",
  width: "100%",
  padding: "1.5rem",
  borderRadius: "14px",
  background: "#ffffff",
  boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "1.2rem",
  color: "#2563eb",
  fontSize: "1.5rem",
  fontWeight: "700",
};

const infoContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const infoBox = {
  padding: "0.8rem",
  borderRadius: "10px",
  background: "#f9fafb",
  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
};

const labelStyle = {
  fontWeight: "600",
  color: "#374151",
  fontSize: "0.9rem",
};

const valueStyle = {
  marginTop: "0.25rem",
  fontSize: "1rem",
  color: "#111827",
};

const loadingStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  fontSize: "1.1rem",
  fontWeight: "500",
  color: "#2563eb",
  fontFamily: "Inter, sans-serif",
};

export default Profile;
