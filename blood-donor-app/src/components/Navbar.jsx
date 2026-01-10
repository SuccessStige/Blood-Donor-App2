import { Link, useNavigate } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuth = isAuthenticated();
  const role = getUserRole(); // 'admin' or 'user'

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl"> Blood Donor App</h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>

        {isAuth ? (
          <>
            <Link to="/register-blood">Register Blood</Link>
            <Link to="/donors">Donors</Link>
            <Link
              to="/request-blood"
              className="bg-white text-red-600 px-3 py-1 rounded"
            >
              Request Blood
            </Link>

            {/* ✅ Dashboard button */}
            {role === "admin" && (
              <Link
                to="/admin"
                className="bg-white text-red-600 px-3 py-1 rounded"
              >
                Dashboard
              </Link>
            )}

            <button
              onClick={logout}
              className="bg-white text-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
