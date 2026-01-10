import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DonorPage from "./pages/DonorPage";
import RegisterBloodPage from "./pages/RegisterBloodPage";
import BloodRequestForm from "./pages/BloodRequestForm";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/request-blood" element={<BloodRequestForm />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/register-blood"
            element={
              <PrivateRoute>
                <RegisterBloodPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/donors"
            element={
              <PrivateRoute>
                <DonorPage />
              </PrivateRoute>
            }
          />

          {/* ADMIN ROUTE */}
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                  <AdminDashboard />
                </PrivateRoute>

            }
          />
        </Routes>
      </div>

      <ToastContainer position="top-right" />
      <Footer />
    </Router>
  );
}

export default App;
