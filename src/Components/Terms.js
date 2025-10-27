import React from "react";
import { Shield, Truck, Wallet, UserCheck, AlertTriangle, FileX } from "lucide-react";

export default function Terms() {
  return (
    <div style={pageStyle}>
      {/* Hero Section */}
      <div style={heroStyle}>
        <h1 style={heroTitle}>Delivery Partner Terms & Conditions</h1>
        <p style={heroSubtitle}>
          Please read carefully before using our platform as a delivery partner.
        </p>
      </div>

      {/* Terms Container */}
      <div style={containerStyle}>
        <Section
          icon={<UserCheck style={iconStyle} />}
          title="1. Partner Eligibility"
          text="You must be at least 18 years old with a valid government-issued ID, a registered vehicle, and the necessary permits required by law."
        />
        <Section
          icon={<Truck style={iconStyle} />}
          title="2. Delivery Responsibilities"
          text="Ensure timely and safe delivery of assigned orders, handle items with care, and maintain professional communication with customers."
          list={[
            "Deliver on time and safely.",
            "Handle fragile/perishable items carefully.",
            "Follow customer instructions.",
            "Maintain professional conduct.",
          ]}
        />
        <Section
          icon={<Wallet style={iconStyle} />}
          title="3. Earnings & Payments"
          text="Earnings are credited to your wallet after successful deliveries. Withdrawals are processed to your bank account as per the payout schedule."
        />
        <Section
          icon={<Wallet style={iconStyle} />}
          title="4. Wallet & Transactions"
          text="Wallet top-ups are non-refundable. Ensure accurate bank details for withdrawals, as we are not responsible for failed transactions."
        />
        <Section
          icon={<Shield style={iconStyle} />}
          title="5. Partner Conduct"
          text="Partners must avoid misconduct such as harassment, misuse of data, or illegal activities. Violations may result in termination."
        />
        <Section
          icon={<AlertTriangle style={iconStyle} />}
          title="6. Liability & Insurance"
          text="The company is not responsible for accidents, theft, or damages during delivery. Valid insurance is highly recommended."
        />
        <Section
          icon={<FileX style={iconStyle} />}
          title="7. Termination Policy"
          text="Repeated late deliveries, fraud, or violation of terms may lead to suspension or permanent termination of your account."
        />

        <p style={footerText}>
          By continuing to use the app, you agree to these Terms & Conditions.  
          For any support, please contact our helpdesk.
        </p>
      </div>

      {/* Responsive Styling */}
      <style>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem !important;
          }
          h2 {
            font-size: 1.2rem !important;
          }
          div[style*="maxWidth: 900px"] {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- Section Component ---------- */
function Section({ icon, title, text, list }) {
  return (
    <div style={sectionCard}>
      <div style={sectionHeader}>
        {icon}
        <h2 style={sectionTitle}>{title}</h2>
      </div>
      <p style={sectionText}>{text}</p>
      {list && (
        <ul style={listStyle}>
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- Styles ---------- */
const pageStyle = {
  background: "#f9fafb",
  minHeight: "100vh",
  fontFamily: "Inter, sans-serif",
};

const heroStyle = {
  background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
  padding: "3rem 1rem",
  textAlign: "center",
  color: "#fff",
};

const heroTitle = {
  fontSize: "2.5rem",
  fontWeight: "700",
  marginBottom: "0.5rem",
};

const heroSubtitle = {
  fontSize: "1.2rem",
  opacity: "0.9",
};

const containerStyle = {
  maxWidth: "900px",
  margin: "2rem auto",
  padding: "2rem",
  background: "#fff",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};

const sectionCard = {
  marginBottom: "2rem",
  padding: "1.5rem",
  borderRadius: "12px",
  background: "#f3f4f6",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
};

const sectionHeader = {
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  marginBottom: "0.8rem",
};

const sectionTitle = {
  fontSize: "1.4rem",
  fontWeight: "600",
  color: "#1e3a8a",
};

const sectionText = {
  fontSize: "1rem",
  color: "#374151",
  lineHeight: "1.6",
};

const listStyle = {
  paddingLeft: "1.5rem",
  marginTop: "0.5rem",
  color: "#374151",
  lineHeight: "1.6",
};

const footerText = {
  marginTop: "2rem",
  fontSize: "0.95rem",
  color: "#6b7280",
  textAlign: "center",
};

const iconStyle = { color: "#2563eb", width: "22px", height: "22px" };
