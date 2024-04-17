import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/profile/Profile";
import AdminLogin from "./components/Admin/Login/AdminLogin";
import Admindashboard from "./components/Admin/Dashboard/Admindashboard";
import Adduser from "./components/Admin/Adduser/Adduser";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/adduser" element={<Adduser />} />
          <Route path="/admin/dashboard" element={<Admindashboard />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
