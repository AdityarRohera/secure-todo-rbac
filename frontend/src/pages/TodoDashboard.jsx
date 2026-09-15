import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoCard from "../components/TodoCard.jsx";
import Button from "../components/Button.jsx";
import Loader from "../components/Loader.jsx";
import { getTodos, updateTodo, deleteTodo } from "../services/todoService.js";
import { getErrorMessage } from "../services/api.js";
import { useAuth } from "../hooks/useAuth.js";

const TodoDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [showAll, setShowAll] = useState(false); // admin only
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data.todos);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleToggle = async (todo) => {
    try {
      await updateTodo(todo._id, { completed: !todo.completed });

      setTodos(
        todos.map((t) => (t._id === todo._id ? { ...t, completed: !t.completed } : t))
      );
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleDelete = async (todo) => {
    if (!window.confirm(`Delete "${todo.title}"?`)) return;

    try {
      await deleteTodo(todo._id);

      setTodos(todos.filter((t) => t._id !== todo._id));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  // API gives admin all todos, so "My Todos" keeps only admin's own
  const visibleTodos = todos
    .filter((todo) => showAll || todo.user?._id === user.id)
    .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
    .filter((todo) => category === "all" || todo.category === category)
    .filter((todo) => {
      if (status === "completed") return todo.completed;
      if (status === "pending") return !todo.completed;
      return true;
    });

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h1 className="text-2xl font-bold">{showAll ? "All Users' Todos" : "My Todos"}</h1>

        <Button onClick={() => navigate("/todos/new")}>+ Add Todo</Button>
      </div>

      {/* Admin can switch between own todos and everyone's todos */}
      {user.role === "admin" && (
        <div className="flex gap-2 mb-4">
          <Button variant={showAll ? "secondary" : "primary"} onClick={() => setShowAll(false)}>
            My Todos
          </Button>
          <Button variant={showAll ? "primary" : "secondary"} onClick={() => setShowAll(true)}>
            All Users' Todos
          </Button>
        </div>
      )}

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white"
        >
          <option value="all">All Categories</option>
          <option value="Urgent">Urgent</option>
          <option value="Non-Urgent">Non-Urgent</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {visibleTodos.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No todos found</p>
      ) : (
        <div className="space-y-3">
          {visibleTodos.map((todo) => (
            <TodoCard
              key={todo._id}
              todo={todo}
              showOwner={showAll}
              onToggle={handleToggle}
              onEdit={(t) => navigate(`/todos/${t._id}/edit`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoDashboard;
