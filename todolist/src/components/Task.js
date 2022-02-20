import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { Trash, Pencil } from "react-bootstrap-icons";

function Task ({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TaskForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
        {todo.date}
        {todo.type}
      </div>
      <div className="icons">
        <Trash
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <Pencil
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
};

export default Task;
