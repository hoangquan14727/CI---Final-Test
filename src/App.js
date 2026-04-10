import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [tab, setTab] = useState("All");
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), name: input.trim(), active: true }]);
    setInput("");
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleDeleteAll = () => {
    setTodos(todos.filter((t) => t.active === true));
  };

  const filteredTodos =
    tab === "Active"
      ? todos.filter((t) => t.active)
      : tab === "Completed"
      ? todos.filter((t) => !t.active)
      : todos;

  return (
    <div className="app">
      <h1 className="title">#todo</h1>

      <div className="tabs">
        {["All", "Active", "Completed"].map((t) => (
          <button
            key={t}
            className={tab === t ? "tab active-tab" : "tab"}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab !== "Completed" && (
        <div className="input-row">
          <input
            type="text"
            placeholder="add details"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button className="add-btn" onClick={handleAdd}>
            Add
          </button>
        </div>
      )}

      <ul className="todo-list">
        {filteredTodos.map((t) => (
          <li key={t.id} className={!t.active ? "todo-item completed" : "todo-item"}>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={!t.active}
                onChange={() => handleToggle(t.id)}
              />
              <span className="checkmark"></span>
              <span className={!t.active ? "task-name done" : "task-name"}>
                {t.name}
              </span>
            </label>
            {tab === "Completed" && (
              <button className="delete-btn" onClick={() => handleDelete(t.id)}>
                🗑️
              </button>
            )}
          </li>
        ))}
      </ul>

      {tab === "Completed" && filteredTodos.length > 0 && (
        <div className="delete-all-container">
          <button className="delete-all-btn" onClick={handleDeleteAll}>
            🗑️ delete all
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
