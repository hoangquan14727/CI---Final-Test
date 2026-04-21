import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [tab, setTab] = useState("All");
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    const newTodo = { id: Date.now(), name: input.trim(), active: true };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleToggle = (id) => {
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, active: !todo.active };
      }
      return todo;
    });
    setTodos(updated);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDeleteAll = () => {
    setTodos(todos.filter((todo) => todo.active === true));
  };

  let filteredTodos = todos;
  if (tab === "Active") {
    filteredTodos = todos.filter((todo) => todo.active);
  } else if (tab === "Completed") {
    filteredTodos = todos.filter((todo) => !todo.active);
  }

  const tabNames = ["All", "Active", "Completed"];

  return (
    <div className="app">
      <h1 className="title">#todo</h1>

      <div className="tabs">
        {tabNames.map((tabName) => {
          const isActive = tab === tabName;
          return (
            <button
              key={tabName}
              className={isActive ? "tab active-tab" : "tab"}
              onClick={() => setTab(tabName)}
            >
              {tabName}
            </button>
          );
        })}
      </div>

      {tab !== "Completed" && (
        <form
          className="input-row"
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <input
            type="text"
            placeholder="add details"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      )}

      <ul className="todo-list">
        {filteredTodos.map((todo) => {
          const isCompleted = !todo.active;
          const itemClass = isCompleted ? "todo-item completed" : "todo-item";
          const nameClass = isCompleted ? "task-name done" : "task-name";

          return (
            <li key={todo.id} className={itemClass}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => handleToggle(todo.id)}
                />
                <span className="checkmark"></span>
                <span className={nameClass}>{todo.name}</span>
              </label>
              {tab === "Completed" && (
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(todo.id)}
                >
                  🗑️
                </button>
              )}
            </li>
          );
        })}
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
