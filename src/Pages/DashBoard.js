import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();

  // ✅ Helper: Decode JWT
  const isTokenValid = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // decode middle part
      const expiry = payload.exp * 1000; // exp is in seconds → ms
      return Date.now() < expiry;
    } catch (err) {
      return false;
    }
  };

  // ✅ Check token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !isTokenValid(token)) {
      setAuthError(true);
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const stats = [
    { title: "Deliveries Today", value: 12 },
    { title: "Earnings", value: "₹1,450" },
    { title: "Pending Orders", value: 3 },
  ];

  const deliveries = [
    { id: 1, orderId: "ORD123", customer: "Ravi Kumar", status: "Delivered", time: "10:30 AM" },
    { id: 2, orderId: "ORD124", customer: "Priya Sharma", status: "Pending", time: "11:15 AM" },
    { id: 3, orderId: "ORD125", customer: "Amit Verma", status: "Delivered", time: "12:00 PM" },
  ];

  if (loading) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading dashboard...</p>;
  if (authError) return <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>Unauthorized. Redirecting...</p>;

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f9fafb", minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          background: "#2563eb",
          color: "#fff",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Delivery Dashboard</h1>
      </header>

      {/* Main Content */}
      <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Stats Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                textAlign: "center",
              }}
            >
              <h3 style={{ fontSize: "1rem", color: "#6b7280" }}>{stat.title}</h3>
              <p style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "0.5rem" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Deliveries */}
        <section>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "1rem" }}>
            Recent Deliveries
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <thead style={{ background: "#f3f4f6" }}>
                <tr>
                  <th style={thStyle}>Order ID</th>
                  <th style={thStyle}>Customer</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Time</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((d) => (
                  <tr key={d.id}>
                    <td style={tdStyle}>{d.orderId}</td>
                    <td style={tdStyle}>{d.customer}</td>
                    <td style={{ ...tdStyle, color: d.status === "Delivered" ? "green" : "orange" }}>
                      {d.status}
                    </td>
                    <td style={tdStyle}>{d.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "1rem",
  fontSize: "0.9rem",
  fontWeight: "600",
  color: "#374151",
};

const tdStyle = {
  padding: "1rem",
  borderTop: "1px solid #e5e7eb",
  fontSize: "0.95rem",
};

export default Dashboard;
