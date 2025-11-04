import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, MapPin, CheckCircle, Clock } from "lucide-react";
import axios from "axios";
import config from "./config";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? config.LOCAL_BASE_URL
      : config.BASE_URL;

  // ✅ Fetch Orders
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.get(`${apiUrl}/api/orders/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (err) {
      console.error("Fetch Orders Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Mark Order as Delivered
  const markDelivered = async (order_id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${apiUrl}/api/orders/${order_id}/deliver`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders(); // refresh
    } catch (err) {
      console.error("Update Order Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div style={loadingStyle}>Loading orders...</div>;
  }

  return (
    <div style={pageStyle}>
      <motion.div
        style={headerStyle}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Package style={{ width: "45px", height: "45px", color: "#fff" }} />
        <h1 style={headerTitle}>My Orders</h1>
        <p style={headerSubtitle}>Track and manage customer deliveries</p>
      </motion.div>

      <div style={ordersWrapper}>
        {orders.map((order, index) => (
          <motion.div
            key={order.order_id || order.id}
            style={orderCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={orderId}>{order.id || order.order_id}</h2>
              <span style={orderAmount}>₹{order.amount}</span>
            </div>

            <p style={customerName}>👤 {order.customer_name}</p>
            <p style={orderAddress}>
              <MapPin size={16} style={{ marginRight: "6px" }} />
              {order.customer_address}
            </p>

            <div style={statusWrapper(order.status)}>
              {order.status === "Delivered" ? (
                <CheckCircle size={18} />
              ) : (
                <Clock size={18} />
              )}
              <span>{order.status}</span>
            </div>

            {order.status !== "Delivered" && (
              <div style={actionsWrapper}>
                <button
                  style={{ ...actionButton, background: "#16a34a" }}
                  onClick={() => markDelivered(order.order_id)}
                >
                  Mark Delivered ✅
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* === same styles as before === */
const loadingStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "600",
  fontSize: "1.1rem",
  color: "#2563eb",
};

const pageStyle = {
  background: "#f9fafb",
  minHeight: "100vh",
  fontFamily: "Inter, sans-serif",
  paddingBottom: "2rem",
};

const headerStyle = {
  background: "linear-gradient(135deg, #2563eb, #1e40af)",
  padding: "2.5rem 1rem",
  textAlign: "center",
  color: "#fff",
  borderBottomLeftRadius: "20px",
  borderBottomRightRadius: "20px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
};

const headerTitle = { fontSize: "2rem", fontWeight: "700", marginTop: "1rem" };
const headerSubtitle = { fontSize: "1rem", opacity: 0.9 };
const ordersWrapper = {
  maxWidth: "900px",
  margin: "2rem auto",
  padding: "0 1rem",
  display: "grid",
  gap: "1.5rem",
};
const orderCard = {
  background: "#fff",
  padding: "1.5rem",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};
const orderId = { fontSize: "1.2rem", fontWeight: "600", color: "#111827" };
const orderAmount = { fontSize: "1rem", fontWeight: "700", color: "#2563eb" };
const customerName = { fontSize: "1rem", fontWeight: "500" };
const orderAddress = {
  display: "flex",
  alignItems: "center",
  fontSize: "0.95rem",
  color: "#374151",
};
const statusWrapper = (status) => ({
  marginTop: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "0.5rem 1rem",
  borderRadius: "8px",
  background:
    status === "Delivered"
      ? "rgba(34,197,94,0.15)"
      : "rgba(251,191,36,0.15)",
  color: status === "Delivered" ? "#16a34a" : "#b45309",
  fontWeight: "600",
  width: "fit-content",
});
const actionsWrapper = {
  marginTop: "1rem",
  display: "flex",
  gap: "1rem",
};
const actionButton = {
  flex: 1,
  padding: "0.7rem",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s",
};

export default Orders;
