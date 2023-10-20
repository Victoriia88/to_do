import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  const addTodo = () => {
    if (todoText) {
      setTodos([...todos, { text: todoText, completed: false }]);
      setTodoText("");
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  function handleDeleteFactory(id) {
    const newList = [...todos];
    newList.splice(id, 1);
    setTodos(newList);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <ul>
          {todos.map((todo, index) => (
            <div className="item" key={index}>
              <li
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                onClick={() => toggleTodo(index)}
              >
                {todo.text}
              </li>
              <button onClick={() => handleDeleteFactory(index)}>Delete</button>
            </div>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Enter a task"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;
