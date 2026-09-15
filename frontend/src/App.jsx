import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TodoDashboard from "./pages/TodoDashboard.jsx";
import TodoFormPage from "./pages/TodoFormPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />

      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          {/* Public pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Logged in users */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TodoDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todos/new"
            element={
              <ProtectedRoute>
                <TodoFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todos/:id/edit"
            element={
              <ProtectedRoute>
                <TodoFormPage />
              </ProtectedRoute>
            }
          />

          {/* Admin only */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
