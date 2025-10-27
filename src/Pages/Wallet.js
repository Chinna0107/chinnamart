import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Wallet() {
  const [balance, setBalance] = useState(2450.5);
  const [txns, setTxns] = useState([
    { id: 1, orderId: "ORD123", type: "Credit", amount: 150, status: "Completed", created_at: "2025-09-05T10:30:00Z" },
    { id: 2, orderId: "ORD124", type: "Debit", amount: 50, status: "Completed", created_at: "2025-09-05T12:10:00Z" },
    { id: 3, orderId: "TOPUP", type: "Credit", amount: 2000, status: "Completed", created_at: "2025-09-01T09:00:00Z" },
  ]);
  const [showTopup, setShowTopup] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={{ margin: 0 }}>Wallet</h2>
        <p style={{ margin: 0, color: "#6b7280" }}>Manage earnings, top-up and withdraw</p>
      </header>

      <main style={containerStyle}>
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={balanceCardStyle}
        >
          <div style={{ flex: 1 }}>
            <div style={{ color: "#dbeafe", fontSize: 14 }}>Current Balance</div>
            <div style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>
              ₹ {balance.toLocaleString()}
            </div>
          </div>

          <div className="wallet-actions">
            <button style={ctaBtnStyle} onClick={() => setShowTopup(true)}>Top-up</button>
            <button style={secondaryBtnStyle} onClick={() => setShowWithdraw(true)}>Withdraw</button>
          </div>
        </motion.div>

        {/* Quick stats */}
        <div style={gridStyle}>
          <SmallCard title="Deliveries Today" value="12" />
          <SmallCard title="Completed Today" value="10" />
          <SmallCard title="Pending Payouts" value="₹120" />
        </div>

        {/* Transactions */}
        <section style={{ marginTop: 20 }}>
          <h3 style={{ marginBottom: 12 }}>Recent Transactions</h3>

          {/* Desktop Table */}
          <div className="txn-table">
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Txn ID</th>
                  <th style={thStyle}>Order</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Date</th>
                </tr>
              </thead>
              <tbody>
                {txns.map(tx => (
                  <tr key={tx.id}>
                    <td style={tdStyle}>#{tx.id}</td>
                    <td style={tdStyle}>{tx.orderId}</td>
                    <td style={tdStyle}>{tx.type}</td>
                    <td style={tdStyle}>₹{tx.amount}</td>
                    <td style={tdStyle}><StatusBadge status={tx.status} /></td>
                    <td style={tdStyle}>{new Date(tx.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="txn-cards">
            {txns.map(tx => (
              <div key={tx.id} style={txnCardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>#{tx.id} • {tx.type}</strong>
                  <StatusBadge status={tx.status} />
                </div>
                <p style={{ margin: "6px 0" }}>Order: {tx.orderId}</p>
                <p style={{ margin: "6px 0" }}>Amount: ₹{tx.amount}</p>
                <small style={{ color: "#6b7280" }}>{new Date(tx.created_at).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .wallet-actions {
            margin-top: 14px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
          }
          .txn-table {
            display: none;
          }
          .txn-cards {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
        }
        @media (min-width: 769px) {
          .wallet-actions {
            display: flex;
            gap: 10px;
          }
          .txn-table {
            display: block;
          }
          .txn-cards {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- Small Components ---------- */
function SmallCard({ title, value }) {
  return (
    <div style={smallCardStyle}>
      <div style={{ color: "#6b7280", fontSize: 13 }}>{title}</div>
      <div style={{ fontWeight: 700, marginTop: 6 }}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Completed: { bg: "#ecfdf5", color: "#059669" },
    Pending: { bg: "#fffbeb", color: "#d97706" },
    Failed: { bg: "#fff1f2", color: "#dc2626" },
  };
  const s = map[status] || { bg: "#f3f4f6", color: "#374151" };
  return (
    <span style={{ background: s.bg, color: s.color, padding: "4px 10px", borderRadius: 999, fontSize: 13, fontWeight: 600 }}>
      {status}
    </span>
  );
}

/* ---------- Styles ---------- */
const pageStyle = { fontFamily: "Inter, sans-serif", minHeight: "100vh", background: "#f8fafc" };
const headerStyle = { padding: "20px 24px 0 24px" };
const containerStyle = { padding: "20px 24px", maxWidth: 1000, margin: "0 auto" };

const balanceCardStyle = {
  background: "linear-gradient(180deg, #2563eb, #1e3a8a)",
  color: "#fff",
  borderRadius: 14,
  padding: 18,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
};

const ctaBtnStyle = {
  background: "#fff", color: "#2563eb", padding: "10px 14px", borderRadius: 10, fontWeight: 700, cursor: "pointer", border: "none"
};
const secondaryBtnStyle = {
  background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)",
  padding: "10px 14px", borderRadius: 10, fontWeight: 600, cursor: "pointer"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: 12,
  marginTop: 16,
};

const smallCardStyle = {
  background: "#fff",
  borderRadius: 12,
  padding: 14,
  boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
  borderRadius: 8,
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};
const thStyle = { padding: 12, textAlign: "left", fontSize: 13, color: "#6b7280", borderBottom: "1px solid #e5e7eb" };
const tdStyle = { padding: 12, borderBottom: "1px solid #e5e7eb", fontSize: 14 };

const txnCardStyle = {
  background: "#fff",
  borderRadius: 10,
  padding: 14,
  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
};
