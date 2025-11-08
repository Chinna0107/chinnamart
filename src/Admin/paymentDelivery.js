import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AdminWalletPanel() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:4000/admin/wallet/withdraw-requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching withdraw requests:", err);
      Swal.fire("Error", "Failed to load withdraw requests", "error");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const confirm = await Swal.fire({
      title: `Are you sure you want to ${newStatus} this request?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${newStatus}`,
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);
      await axios.put(`http://localhost:4000/admin/wallet/withdraw-requests/${id}`, {
        status: newStatus,
      });
      Swal.fire("Success", `Request ${newStatus}`, "success");
      fetchRequests();
    } catch (err) {
      console.error("Error updating status:", err);
      Swal.fire("Error", "Failed to update status", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>💼 Withdraw Requests</h2>

      {requests.length === 0 ? (
        <p style={{ textAlign: "center" }}>No withdrawal requests found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f3f3f3", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>ID</th>
              <th>User</th>
              <th>Amount (₹)</th>
              <th>UPI ID</th>
              <th>Status</th>
              <th>Requested At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px" }}>{req.id}</td>
                <td>{req.full_name}</td>
                <td>₹{req.amount}</td>
                <td>{req.upi_id}</td>
                <td
                  style={{
                    color:
                      req.status === "approved"
                        ? "green"
                        : req.status === "rejected"
                        ? "red"
                        : "orange",
                  }}
                >
                  {req.status}
                </td>
                <td>{new Date(req.requested_at).toLocaleString()}</td>
                <td>
                  {req.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(req.id, "approved")}
                        disabled={loading}
                        style={{
                          background: "green",
                          color: "white",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "5px",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(req.id, "rejected")}
                        disabled={loading}
                        style={{
                          background: "red",
                          color: "white",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminWalletPanel;
