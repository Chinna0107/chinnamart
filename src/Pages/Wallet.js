import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const token = localStorage.getItem("token");

  // Fetch wallet balance and transactions
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/wallet", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWallet(res.data.balance);
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error("Error fetching wallet:", err);
        Swal.fire("Error", "Unable to fetch wallet details", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, [token]);

  // Handle withdrawal
  const handleWithdraw = async () => {
    if (!withdrawAmount || withdrawAmount <= 0 || !upiId) {
      Swal.fire("Warning", "Please enter valid amount and UPI ID", "warning");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/wallet/withdraw",
        { amount: withdrawAmount, upi_id: upiId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Success", res.data.message, "success");
      setWithdrawAmount("");
      setUpiId("");
    } catch (err) {
      console.error("Withdraw error:", err);
      Swal.fire("Error", err.response?.data?.error || "Withdrawal failed", "error");
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <p>Loading wallet...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <motion.div
        style={styles.card}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={styles.heading}>💼 My Wallet</h2>

        <div style={styles.balanceBox}>
          <h3>Wallet Balance</h3>
          <p style={styles.balance}>₹{wallet ?? 0}</p>
        </div>

        {/* Withdraw Section */}
        <div style={styles.withdrawContainer}>
          <input
            type="number"
            placeholder="Enter amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Enter UPI ID (e.g. user@upi)"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleWithdraw} style={styles.button}>
            Withdraw
          </button>
        </div>

        {/* Transactions */}
        <h3 style={{ marginTop: "1rem" }}>Recent Transactions</h3>
        {transactions.length > 0 ? (
          <ul style={styles.transactionList}>
            {transactions.map((tx) => (
              <motion.li
                key={tx.id}
                style={{
                  ...styles.transaction,
                  color: tx.type === "credit" ? "green" : "red",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <strong>{tx.type.toUpperCase()}</strong> — ₹{tx.amount} <br />
                <small>{tx.description}</small>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p>No transactions found</p>
        )}
      </motion.div>
    </div>
  );
}

/* ---------- Inline Styles ---------- */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #4ade80, #60a5fa)",
    fontFamily: "Inter, sans-serif",
    padding: "1rem",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#2563eb",
    fontWeight: "700",
  },
  balanceBox: {
    textAlign: "center",
    background: "#f0f9ff",
    padding: "1rem",
    borderRadius: "10px",
    marginBottom: "1rem",
  },
  balance: {
    fontSize: "2rem",
    fontWeight: "700",
    margin: 0,
    color: "#059669",
  },
  withdrawContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  input: {
    padding: "0.7rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
  },
  button: {
    background: "#2563eb",
    color: "#fff",
    padding: "0.7rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  transactionList: {
    listStyle: "none",
    padding: 0,
    marginTop: "0.5rem",
  },
  transaction: {
    padding: "0.7rem",
    borderBottom: "1px solid #e5e7eb",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#2563eb",
  },
};

export default Wallet;
