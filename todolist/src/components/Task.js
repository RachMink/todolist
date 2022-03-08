import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { Trash, Pencil } from "react-bootstrap-icons";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Form,
  Toast,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

function Task({
  handleInputChange,
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
  checkOff,
}) {
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  

  //let sound = new Audio("/Success-sound-effect.mp3");

  const deleteShowModal = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  const deleteIt = (id) => {
    removeTodo(id);
    setShow(false);
  };

//  const start = () => {
//    console.log("play sound");
//    sound.play();
//  };


  return (
    <>
      {todos.map((todo, index) => (
        <div className={`todo ${todo.type}`} key={index}>
          <div className="todo-body" key={todo.id}>
            <div
              className={todo.isComplete ? "todo-row complete" : "todo-row"}
              key={index}
            >
              <div key={todo.id}>
                <input
                  type="checkbox"
                  className="check"
                  checked={todo.isChecked ? true : false}
                  onClick={() => completeTodo(todo.id)}
                  readOnly
                />
                {todo.text}
              </div>
            </div>
          </div>
          <div className="todo-footer">
            {todo.date}
            <Trash
              onClick={() => deleteShowModal(todo.id)}
              className="delete-icon"
            />
          </div>
        </div>
      ))}

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <p>Are you sure you want to delete?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setShow(false)}>
            No
          </Button>
          <Button variant="dark" onClick={() => deleteIt(deleteId)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Task;
