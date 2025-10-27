import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/admin/orders"; // update if needed

export default function AdminPayments() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const getToken = () =>
    localStorage.getItem("admintoken") || localStorage.getItem("adminToken");

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) throw new Error("No admin token found");

      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Normalize: ensure cart_items is parsed as array if stored as JSON string
      const normalized = res.data.map((o) => ({
        ...o,
        cart_items:
          typeof o.cart_items === "string"
            ? safeJsonParse(o.cart_items)
            : o.cart_items || [],
      }));

      setOrders(
        normalized.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
    } catch (err) {
      console.error("Admin Orders Fetch Error:", err);
      setError(err.response?.data?.message || err.message || "Fetch failed");
    } finally {
      setLoading(false);
    }
  };

  const safeJsonParse = (s) => {
    try {
      return JSON.parse(s);
    } catch {
      return [];
    }
  };

  // filtering: name, order_id, date, address
  const filteredOrders = orders.filter((item) => {
    const orderDate = (item.created_at || "").split("T")[0];
    return (
      (item.customer_name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(item.order_id || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      orderDate.includes(search) ||
      (item.customer_address || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  // totals
  const dateOnly = (d) => (d ? d.split("T")[0] : "");
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  const sumFor = (dateStr) =>
    orders
      .filter((o) => dateOnly(o.created_at) === dateStr)
      .reduce((s, o) => s + Number(o.amount || 0), 0);

  const todayTotal = sumFor(today);
  const yesterdayTotal = sumFor(yesterday);

  // modal open
  const openModal = (order) => {
    setActiveOrder(order);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setActiveOrder(null);
  };

  // status badge helper
  const statusStyle = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "paid" || s === "captured" || s === "success") {
      return { background: "#DCFCE7", color: "#166534", label: "Paid" };
    }
    if (s === "refunded" || s === "refund") {
      return { background: "#FEF3C7", color: "#92400e", label: "Refunded" };
    }
    if (s === "failed" || s === "error") {
      return { background: "#FEE2E2", color: "#B91C1C", label: "Failed" };
    }
    return { background: "#E6E7F2", color: "#374151", label: status || "Unknown" };
  };

  return (
    <div style={page}>
      <h2 style={pageHeader}>💳 Admin Payments</h2>

      <div style={topRow}>
        <div style={statCard}>
          <div style={statLabel}>Today's Revenue</div>
          <div style={statValue}>₹{todayTotal.toLocaleString()}</div>
        </div>
        <div style={statCard}>
          <div style={statLabel}>Yesterday's Revenue</div>
          <div style={statValue}>₹{yesterdayTotal.toLocaleString()}</div>
        </div>
        <div style={statCard}>
          <div style={statLabel}>Total Orders</div>
          <div style={statValue}>{orders.length}</div>
        </div>

        <div style={{ marginLeft: "auto", minWidth: 260 }}>
          <input
            placeholder="Search by name, order id, date (YYYY-MM-DD), address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInput}
          />
        </div>
      </div>

      {loading && <div style={info}>Loading orders…</div>}
      {error && <div style={errorBox}>Error: {error}</div>}

      {!loading && !error && (
        <div style={tableWrap}>
          <table style={table}>
            <thead style={thead}>
              <tr>
                <th style={th}>Order ID</th>
                <th style={th}>Customer</th>
                <th style={th}>Amount</th>
                <th style={th}>Status</th>
                <th style={th}>Date</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length === 0 && (
                <tr>
                  <td style={tdEmpty} colSpan={6}>
                    No orders found.
                  </td>
                </tr>
              )}

              {filteredOrders.map((o) => {
                const st = statusStyle(o.status);
                return (
                  <tr key={o.order_id || o.id}>
                    <td style={td}>{o.order_id ?? o.id}</td>
                    <td style={tdLeft}>
                      <div style={{ fontWeight: 700 }}>{o.customer_name}</div>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>
                        {o.customer_email}
                      </div>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>
                        {o.customer_phone}
                      </div>
                    </td>
                    <td style={{ ...td, fontWeight: 700, color: "#0b84a5" }}>
                      ₹{Number(o.amount || o.total_amount || 0).toLocaleString()}
                    </td>
                    <td style={td}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "6px 10px",
                          borderRadius: 20,
                          background: st.background,
                          color: st.color,
                          fontWeight: 600,
                          fontSize: 13,
                        }}
                      >
                        {st.label}
                      </span>
                    </td>
                    <td style={td}>
                      {o.created_at ? new Date(o.created_at).toLocaleString() : "—"}
                    </td>
                    <td style={td}>
                      <button style={btn} onClick={() => openModal(o)}>
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal (white card + zoom) */}
      {showModal && activeOrder && (
        <div style={modalOverlay} onClick={closeModal}>
          <div style={modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <h3 style={{ margin: 0 }}>Order #{activeOrder.order_id ?? activeOrder.id}</h3>
              <button style={modalClose} onClick={closeModal}>
                ✕
              </button>
            </div>

            <div style={modalBody}>
              <div style={modalRow}>
                <div style={label}>Customer</div>
                <div style={value}>
                  {activeOrder.customer_name} — {activeOrder.customer_phone}
                  <div style={{ fontSize: 13, color: "#374151" }}>
                    {activeOrder.customer_email}
                  </div>
                </div>
              </div>

              <div style={modalRow}>
                <div style={label}>Address</div>
                <div style={value}>{activeOrder.customer_address || "N/A"}</div>
              </div>

              <div style={modalRow}>
                <div style={label}>Payment</div>
                <div style={value}>
                  <div>Payment ID: {activeOrder.payment_id || "—"}</div>
                  <div>Amount: ₹{Number(activeOrder.amount || 0).toLocaleString()}</div>
                  <div>Status: {activeOrder.status || "—"}</div>
                </div>
              </div>

              <div style={{ marginTop: 10 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Cart Items</div>
                {Array.isArray(activeOrder.cart_items) && activeOrder.cart_items.length > 0 ? (
                  <div style={{ borderTop: "1px solid #e6e6e6", paddingTop: 8 }}>
                    {activeOrder.cart_items.map((ci, i) => {
                      // Expecting each cart item to have: name, qty, price
                      const name = ci.name || ci.title || ci.product_name || "Item";
                      const qty = ci.qty ?? ci.quantity ?? ci.q ?? 1;
                      const price = ci.price ?? ci.unit_price ?? ci.amount ?? 0;
                      return (
                        <div key={i} style={cartItemRow}>
                          <div style={{ fontWeight: 600 }}>{name}</div>
                          <div style={{ color: "#6b7280", fontSize: 13 }}>
                            qty: {qty} • ₹{Number(price).toLocaleString()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ color: "#6b7280" }}>No cart items available</div>
                )}
              </div>

              <div style={{ marginTop: 14, textAlign: "right" }}>
                <button style={closeBtn} onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== styles (inline) ===== */

const page = { width: "95%", margin: "20px auto", fontFamily: "Inter, sans-serif" };
const pageHeader = {
  fontSize: 22,
  margin: 0,
  padding: "10px 12px",
  background: "linear-gradient(90deg,#0f172a,#334155)",
  color: "white",
  borderRadius: 8,
};
const topRow = {
  display: "flex",
  gap: 16,
  alignItems: "center",
  marginTop: 16,
  flexWrap: "wrap",
};
const statCard = {
  background: "#0b4a5a",
  color: "white",
  padding: 14,
  borderRadius: 10,
  minWidth: 180,
  boxShadow: "0 6px 18px rgba(2,6,23,0.08)",
};
const statLabel = { opacity: 0.9, fontSize: 13 };
const statValue = { fontSize: 20, fontWeight: 800, marginTop: 6 };

const searchInput = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
};

const tableWrap = {
  marginTop: 18,
  overflowX: "auto",
  borderRadius: 10,
  boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
};

const table = { width: "100%", borderCollapse: "collapse", minWidth: 900 };
const thead = {};
const th = {
  padding: "12px 14px",
  background: "#0b1220",
  color: "white",
  textAlign: "left",
  fontSize: 13,
};
const td = { padding: "12px 14px", borderBottom: "1px solid #eef2f7", textAlign: "center" };
const tdLeft = { padding: "12px 14px", borderBottom: "1px solid #eef2f7", textAlign: "left" };
const tdEmpty = { padding: 30, textAlign: "center", color: "#6b7280" };

const btn = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: 700,
};

const info = { padding: 16, color: "#2563eb", fontWeight: 700 };
const errorBox = { padding: 12, color: "#b91c1c", background: "#fff1f2", borderRadius: 8 };

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(2,6,23,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalCard = {
  width: "720px",
  maxWidth: "96%",
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 20px 60px rgba(2,6,23,0.3)",
  transform: "scale(1)",
  animation: "zoomIn 220ms ease",
};

const modalHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 20px",
  borderBottom: "1px solid #eef2f7",
};

const modalClose = {
  border: "none",
  background: "transparent",
  fontSize: 18,
  cursor: "pointer",
};

const modalBody = { padding: "18px 20px", maxHeight: "60vh", overflowY: "auto" };
const modalRow = { display: "flex", gap: 12, marginBottom: 10 };
const label = { width: 120, color: "#374151", fontWeight: 700 };
const value = { flex: 1, color: "#111827" };

const cartItemRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px dashed #eef2f7",
};

const closeBtn = {
  padding: "8px 14px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  background: "#fff",
  cursor: "pointer",
};

const zoomKeyframes = `
@keyframes zoomIn {
  from { transform: scale(0.98); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
`;

// append keyframes to document if in browser
if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = zoomKeyframes;
  document.head.appendChild(styleEl);
}
