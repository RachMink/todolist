import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { Trash, Pencil } from "react-bootstrap-icons";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";


function Task ({ handleInputChange, todos, completeTodo, removeTodo, updateTodo }) {
 const [show, setShow] = useState(false);
 const [deleteId, setDeleteId] = useState("");
//  const [edit, setEdit] = useState({
//     id: null,
//     value: "",
//   });
  

//   const submitUpdate = (value) => {
//     updateTodo(edit.id, value);
//     setEdit({
//       id: null,
//       value: "",
//     });
//   };

  const deleteShowModal = (id)=>{
      setDeleteId(id);
      setShow(true);
  }

  const deleteIt=(id)=>{
      removeTodo(id);
      setShow(false);
  }


  return (
    <>
      {todos.map((todo, index) => (
        <div className= {`todo ${todo.type}`} key={index}>
          <div
            className="todo-body"
            key={todo.id}
            onClick={() => completeTodo(todo.id)}
          >
            {todo.text}
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
          <Button variant="secondary" onClick={() => setShow(false)}>
            No
          </Button>
          <Button variant="primary" onClick={() => deleteIt(deleteId)}>
            Yes
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
};

export default Task;
