import { useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import Loader from "../components/Loader.jsx";
import { getAllUsers, getAllTodos, updateUserRole } from "../services/adminService.js";
import { getErrorMessage } from "../services/api.js";
import { useAuth } from "../hooks/useAuth.js";

const AdminDashboard = () => {
  const { user } = useAuth();

  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, todosData] = await Promise.all([getAllUsers(), getAllTodos()]);

        setUsers(usersData.users);
        setTodos(todosData.todos);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRoleChange = async (selectedUser) => {
    const newRole = selectedUser.role === "admin" ? "user" : "admin";

    try {
      await updateUserRole(selectedUser._id, newRole);

      setUsers(users.map((u) => (u._id === selectedUser._id ? { ...u, role: newRole } : u)));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="flex gap-2 mb-4">
        <Button variant={tab === "users" ? "primary" : "secondary"} onClick={() => setTab("users")}>
          Users ({users.length})
        </Button>
        <Button variant={tab === "todos" ? "primary" : "secondary"} onClick={() => setTab("todos")}>
          All Todos ({todos.length})
        </Button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {/* Users table */}
      {tab === "users" && (
        <div className="bg-white rounded-md shadow-sm overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3">Username</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-gray-200">
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>
                  <td className="p-3">
                    {u._id === user.id ? (
                      <span className="text-gray-400">You</span>
                    ) : (
                      <Button
                        variant={u.role === "admin" ? "danger" : "primary"}
                        onClick={() => handleRoleChange(u)}
                        className="whitespace-nowrap"
                      >
                        {u.role === "admin" ? "Make User" : "Make Admin"}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="p-3 text-xs text-gray-500">
            Role change works after that user logs in again.
          </p>
        </div>
      )}

      {/* Todos table */}
      {tab === "todos" && (
        <div className="bg-white rounded-md shadow-sm overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo._id} className="border-t border-gray-200">
                  <td className="p-3">{todo.title}</td>
                  <td className="p-3">{todo.user?.username || "Unknown"}</td>
                  <td className="p-3">{todo.category}</td>
                  <td className="p-3">{todo.completed ? "Completed" : "Pending"}</td>
                  <td className="p-3">{todo.dueDate ? todo.dueDate.slice(0, 10) : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {todos.length === 0 && <p className="p-3 text-gray-500">No todos yet</p>}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
