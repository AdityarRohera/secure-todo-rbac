import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodoForm from "../components/TodoForm.jsx";
import Loader from "../components/Loader.jsx";
import { getTodos, createTodo, updateTodo } from "../services/todoService.js";
import { getErrorMessage } from "../services/api.js";

// Same page for create (/todos/new) and edit (/todos/:id/edit)
const TodoFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Edit mode: load the todo to fill the form
  useEffect(() => {
    if (!isEdit) return;

    const loadTodo = async () => {
      try {
        const data = await getTodos();
        const foundTodo = data.todos.find((t) => t._id === id);

        if (foundTodo) {
          setTodo(foundTodo);
        } else {
          setError("Todo not found");
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadTodo();
  }, [id, isEdit]);

  const handleSubmit = async (formData) => {
    setError("");
    setSaving(true);

    try {
      if (isEdit) {
        await updateTodo(id, formData);
      } else {
        await createTodo(formData);
      }

      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-sm">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit Todo" : "Create Todo"}</h1>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {(!isEdit || todo) && (
        <TodoForm
          initialTodo={todo}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
          loading={saving}
        />
      )}
    </div>
  );
};

export default TodoFormPage;
