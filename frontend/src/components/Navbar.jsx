import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // No navbar on login / register pages
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <Link to="/" className="text-lg font-bold text-blue-600">
          Todo App
        </Link>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link to="/" className="hover:text-blue-600">
            Todos
          </Link>

          {/* Only admins can see this link */}
          {user.role === "admin" && (
            <Link to="/admin" className="hover:text-blue-600">
              Admin Dashboard
            </Link>
          )}

          <span className="text-gray-500">
            {user.username} ({user.role})
          </span>

          <button onClick={handleLogout} className="text-red-600 hover:underline cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
