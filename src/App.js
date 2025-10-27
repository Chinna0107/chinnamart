import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Terms from "./Components/Terms";
import SignUp from "./Pages/SignUp";
import About from "./Components/About";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import DashBoard from "./Pages/DashBoard";
// import LoginNavBar from "./Pages/LoginNavbar";
import Profile from "./Pages/Profile";
import Wallet from "./Pages/Wallet";
import Faq from "./Components/Faq";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import PaymentsPolicy from "./Components/PaymentsPolicy";
import Orders from "./Pages/Orders";
import Home from "./Pages/Home";
import Header2 from "./Pages/LoginNavbar";
import Admindashboard from "./Admin/Admindashboard";
import AdminOrders from "./Admin/AdminOrders";
import AdminPayments from "./Admin/AdminPayments";
import AdminProfile from "./Admin/AdminPofile";


function App() {
  const token=localStorage.getItem('token');
  const admintoken=localStorage.getItem('admintoken')
  return (
   <div>
    {!token && !admintoken&& <Header/>}
      { token&& !admintoken && <Header2/>}
     <Router>
      {/* <Header/> */}
      {/* <LoginNavBar/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/faq" element={<Faq />}/>
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/payments" element={<PaymentsPolicy/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/admin-dashboard" element={<Admindashboard/>}/>
        <Route path="/admin-orders" element={<AdminOrders/>}/>
        <Route path="/admin-payments" element={<AdminPayments/>}/>
        <Route path="/admin-profile" element={<AdminProfile/>}/>
      </Routes>
      <Footer/>
    </Router>
   </div> 
   
  );
}

export default App;
