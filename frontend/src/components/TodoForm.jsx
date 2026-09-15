import { useState } from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";

const TodoForm = ({ initialTodo, onSubmit, onCancel, loading }) => {
  const [title, setTitle] = useState(initialTodo?.title || "");
  const [description, setDescription] = useState(initialTodo?.description || "");
  const [dueDate, setDueDate] = useState(initialTodo?.dueDate?.slice(0, 10) || "");
  const [category, setCategory] = useState(initialTodo?.category || "Non-Urgent");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");
    onSubmit({ title, description, dueDate, category });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <Input
        label="Title *"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        placeholder="What do you need to do?"
      />

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-400 text-right">{description.length}/500</p>
      </div>

      <Input
        label="Due Date"
        type="date"
        name="dueDate"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Urgent">Urgent</option>
          <option value="Non-Urgent">Non-Urgent</option>
        </select>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Todo"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
