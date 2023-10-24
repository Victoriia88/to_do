import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo, deleteTodo, toggleTodo, editTodo } from "./Redux/actions";

import "./App.css";

function App(props) {
  const [todoText, setTodoText] = useState("");
  const [editedText, setEditedText] = useState("");
  const [editedIndex, setEditedIndex] = useState(null);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoText) {
      props.addTodo(todoText);
      setTodoText("");
    }
  };

  const handleToggleTodo = (index) => {
    props.toggleTodo(index);
  };

  const handleDeleteTodo = (index) => {
    props.deleteTodo(index);
  };

  const handleEditTodo = (index) => {
    setEditedIndex(index);
    setEditedText(props.todos[index].text);
  };

  const handleSaveTodo = (index) => {
    props.editTodo(index, editedText);
    setEditedIndex(null);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <ul>
          {props.todos.map((todo, index) => (
            <div className="item" key={index}>
              <li
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                onClick={() => handleToggleTodo(index)}
              >
                {index === editedIndex ? (
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                ) : (
                  todo.text
                )}
              </li>
              {index === editedIndex ? (
                <button onClick={() => handleSaveTodo(index)}>Save</button>
              ) : (
                <button onClick={() => handleEditTodo(index)}>Edit</button>
              )}
              <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            </div>
          ))}
        </ul>
        <form>
          <input
            type="text"
            placeholder="Enter a task"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button type="submit" onClick={handleAddTodo}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = {
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
