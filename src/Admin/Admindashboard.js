import React, { useState, useEffect } from "react";
import {
  Truck,
  Users,
  Clock,
  DollarSign,
  LogOut,
  User,
  CreditCard,
  List,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../Pages/config";

function AdminDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    totalOrders: 0,
    todayAmount: 0,
    yesterdayAmount: 0,
    totalUsers: 0,
  });
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || !user.is_admin) {
      navigate("/login");
      return;
    }
    fetchDashboardData(token);
  }, [navigate]);

  const apiUrl = process.env.NODE_ENV === 'development' 
      ? config.LOCAL_BASE_URL
      : config.BASE_URL;

  const fetchDashboardData = async (token) => {
    try {
      const paymentsRes = await axios.get(`${apiUrl}admin/payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const usersRes = await axios.get(`${apiUrl}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allPayments = paymentsRes.data;
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split("T")[0];

      const todayPayments = allPayments.filter((p) => p.created_at.split("T")[0] === today);
      const yesterdayPayments = allPayments.filter((p) => p.created_at.split("T")[0] === yesterday);

      const calcAmount = (arr) => arr.reduce((sum, val) => sum + Number(val.amount), 0);

      setStats({
        totalOrders: allPayments.length,
        todayAmount: calcAmount(todayPayments),
        yesterdayAmount: calcAmount(yesterdayPayments),
        totalUsers: usersRes.data.count,
      });

      setOrders(allPayments.slice(0, 5));
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const displayStats = [
    { title: "Total Orders", value: stats.totalOrders, icon: <Truck size={28} />, color: "#2563eb" },
    { title: "Today Revenue", value: `₹${stats.todayAmount}`, icon: <DollarSign size={28} />, color: "#16a34a" },
    { title: "Yesterday Revenue", value: `₹${stats.yesterdayAmount}`, icon: <Clock size={28} />, color: "#f59e0b" },
    { title: "Total Users", value: stats.totalUsers, icon: <Users size={28} />, color: "#dc2626" },
  ];

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={logoStyle}>🚚 Admin Dashboard</h2>

        <nav className="desktop-nav" style={navStyle}>
          <a href="/admin-orders" style={navLink}><List size={18} /> Orders</a>
          <a href="/admin-payments" style={navLink}><CreditCard size={18} /> Payments</a>
          <a href="/admin-profile" style={navLink}><User size={18} /> Profile</a>
          <a href="/admin-payments for delivery" style={navLink}><CreditCard size={18} /> Payments for Delivery</a>
          <button onClick={handleLogout} style={logoutBtn}><LogOut size={18} /> Logout</button>
        </nav>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={menuBtn}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {menuOpen && (
        <div style={mobileMenu}>
          <a href="/admin-orders" style={mobileLink}><List size={18} /> Orders</a>
          <a href="/admin-payments" style={mobileLink}><CreditCard size={18} /> Payments</a>
          <a href="/admin-profile" style={mobileLink}><User size={18} /> Profile</a>
          <button onClick={handleLogout} style={mobileLink}><LogOut size={18} /> Logout</button>
        </div>
      )}

      <h1 style={headingStyle}>📊 Overview</h1>

      <div style={statsGrid} className="stats-grid">
        {displayStats.map((stat, i) => (
          <div key={i} style={{ ...statCard, borderTop: `5px solid ${stat.color}` }} className="stat-card">
            <div style={{ color: stat.color, marginBottom: "0.5rem" }}>{stat.icon}</div>
            <h3 style={statTitle}>{stat.title}</h3>
            <p style={statValue}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div style={ordersContainer}>
        <h2>Recent Paid Orders</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Order ID</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item.order_id} style={rowHover}>
                  <td style={tdStyle}>{item.order_id}</td>
                  <td style={tdStyle}>{item.customer_name}</td>
                  <td style={tdStyle}>{item.customer_email}</td>
                  <td style={tdStyle}>₹{item.amount}</td>
                  <td style={tdStyle}>{new Date(item.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .menu-btn { display: block !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          table { font-size: 0.8rem !important; }
        }
        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 18px rgba(0,0,0,0.12);
          transition: all 0.3s ease;
        }
        tr:hover { background-color: #f9fafb; }
      `}</style>
    </div>
  );
}

/* Styles (same as before) */
const pageStyle = { padding: "2rem", background: "#f9fafb", minHeight: "100vh", fontFamily: "Inter, sans-serif" };
const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(90deg, #2563eb, #1d4ed8)", padding: "1rem 2rem", borderRadius: "12px", color: "#fff", position: "sticky", top: "0", zIndex: "10" };
const logoStyle = { fontWeight: "700", fontSize: "1.4rem" };
const navStyle = { display: "flex", alignItems: "center" };
const navLink = { marginLeft: "1.5rem", textDecoration: "none", color: "#fff", display: "flex", gap: "0.4rem" };
const logoutBtn = { ...navLink, background: "rgba(255,255,255,0.1)", padding: "6px 12px", borderRadius: "8px", cursor: "pointer" };
const menuBtn = { display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer" };
const mobileMenu = { background: "#fff", borderRadius: "12px", padding: "1rem", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" };
const mobileLink = { textDecoration: "none", color: "#374151", fontWeight: "500", display: "flex", gap: "0.4rem", marginBottom: "0.8rem" };
const headingStyle = { fontSize: "1.8rem", fontWeight: "700", margin: "2rem 0 1.5rem" };
const statsGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2rem" };
const statCard = { background: "#fff", padding: "1.5rem", borderRadius: "14px", boxShadow: "0 6px 16px rgba(0,0,0,0.08)" };
const statTitle = { fontSize: "1rem", color: "#6b7280" };
const statValue = { fontSize: "1.6rem", fontWeight: "700", marginTop: "0.5rem" };
const ordersContainer = { background: "#fff", padding: "1.5rem", borderRadius: "14px" };
const tableStyle = { width: "100%", borderCollapse: "collapse", minWidth: "500px" };
const thStyle = { background: "#f3f4f6", padding: "0.75rem", borderBottom: "2px solid #e5e7eb" };
const tdStyle = { padding: "0.75rem", borderBottom: "1px solid #e5e7eb" };
const rowHover = { transition: "0.2s" };

export default AdminDashboard;
