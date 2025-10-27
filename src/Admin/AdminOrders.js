import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("admintoken");

      const response = await axios.get("http://localhost:4000/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      console.error("❌ Orders Fetch Error:", err);
      setError("Failed to fetch orders. Ensure admin token exists.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((item) => {
  const nameMatch =
    item.customer_name.toLowerCase().includes(search.toLowerCase());
  const idMatch = String(item.order_id).includes(search);
  const addressMatch =
    item.customer_address &&
    item.customer_address.toLowerCase().includes(search.toLowerCase());
  const dateMatch = new Date(item.created_at)
    .toLocaleString()
    .toLowerCase()
    .includes(search.toLowerCase());

  return nameMatch || idMatch || addressMatch || dateMatch;
});


  return (
    <div style={containerStyle}>
      <div style={headerCardStyle}>
        <h2 style={titleStyle}>📦 Paid Orders</h2>
        <input
          type="text"
          style={searchStyle}
          placeholder="Search by Name or Order ID or full_address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p style={loadingStyle}>Fetching orders...</p>}
      {error && <p style={errorStyle}>{error}</p>}

      {!loading && !error && filteredOrders.length === 0 && (
        <p style={noOrdersStyle}>No Matching Orders Found</p>
      )}

      {!loading && !error && filteredOrders.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Order ID</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Address</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Payment ID</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((item) => (
                <tr key={item.id} style={rowHover}>
                  <td style={tdStyle}>{item.order_id}</td>
                  <td style={tdStyle}>{item.customer_name}</td>
                  <td style={tdStyle}>{item.customer_email}</td>
                  <td style={tdStyle}>{item.customer_address || "N/A"}</td>
                  <td style={{ ...tdStyle, fontWeight: "700", color: "#2563eb" }}>
                    ₹{item.amount}
                  </td>
                  <td style={tdStyle}>{item.payment_id}</td>
                  <td style={tdStyle}>{new Date(item.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ================= INLINE CSS ================= */
const containerStyle = {
  width: "96%",
  margin: "25px auto",
  fontFamily: "Poppins, sans-serif",
};

const headerCardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
  padding: "18px",
  borderRadius: "12px",
  color: "#fff",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
};

const searchStyle = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  width: "260px",
  fontSize: "14px",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "700",
  margin: 0,
};

const tableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 10px",
  marginTop: "20px",
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  backgroundColor: "#111827",
  color: "#fff",
  fontSize: "14px",
  position: "sticky",
  top: 0,
};

const tdStyle = {
  padding: "12px",
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #ddd",
  fontSize: "14px",
};

const rowHover = {
  transition: "all 0.3s ease",
  cursor: "pointer",
};

const loadingStyle = {
  color: "#2563eb",
  fontWeight: "600",
};

const errorStyle = {
  color: "#e11d48",
  fontWeight: "600",
};

const noOrdersStyle = {
  color: "#6b7280",
  fontSize: "15px",
  marginTop: "15px",
  fontStyle: "italic",
};
