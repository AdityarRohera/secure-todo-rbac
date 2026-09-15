import Button from "./Button.jsx";

const TodoCard = ({ todo, showOwner, onToggle, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm flex items-start gap-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
        className="mt-1 h-4 w-4 cursor-pointer"
        title="Mark as completed"
      />

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={`font-semibold break-words ${todo.completed ? "line-through text-gray-400" : ""}`}>
            {todo.title}
          </h3>

          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              todo.category === "Urgent" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {todo.category}
          </span>
        </div>

        {todo.description && (
          <p className="text-sm text-gray-600 mt-1 break-words">{todo.description}</p>
        )}

        <div className="text-xs text-gray-500 mt-2 flex flex-wrap gap-3">
          {todo.dueDate && <span>Due: {todo.dueDate.slice(0, 10)}</span>}
          {showOwner && <span>By: {todo.user?.username || "Unknown"}</span>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="secondary" onClick={() => onEdit(todo)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(todo)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
