import React, { useState } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import Alert from "react-bootstrap/Alert";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Question, QuestionCircle } from "react-bootstrap-icons";

function TaskList() {
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
    setShow(true);
    return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
   
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>
        Getting things done.
        <QuestionCircle color="white" />
      </h1>

      <TaskForm onSubmit={addTodo} />
      {!show ? (
        <div className="task-list">
          <Task
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </div>
      ) : (
     
          <Alert
            className="alert"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            <p>Oops, you tried adding an empty task</p>
          </Alert>
       
      )}
    </>
  );

}

export default TaskList;
