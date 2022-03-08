import React, { useState } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import Alert from "react-bootstrap/Alert";
import { Container, Col, Row, Button, Modal, Toast, ToastContainer } from "react-bootstrap";
import { QuestionCircle } from "react-bootstrap-icons";
import Confetti from "react-confetti";
//import useWindowSize from "react-use/lib/useWindowSize";




function TaskList() {
  const [todos, setTodos] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [checkedToast, setCheckedToast] = useState(false);
  //const { width, height } = useWindowSize();

  // const start =()=>{
  //   console.log("play sound");
  //   sound.play();
  // }

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
    setShowAlert(true);
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
        todo.isChecked = !todo.isChecked
        if(todo.isChecked){
          setCheckedToast(true);
        }
       
      }
      return todo;
    });

    setTodos(updatedTodos);
  };


  const openKey=()=>{
    setShowKey(true);
  };
  const handleCloseKey=()=>{
    setShowKey(false);
  }

  return (
    <>
      <Container fluid className="header">
        <Row className="justify-content-center">
          <Col lg={1} />
          <Col lg={10}>
            <h1>Let's Do It.</h1>
          </Col>
          <Col lg={1}>
            <QuestionCircle
              color="white"
              className="icon"
              onClick={() => {
                openKey();
              }}
            />
          </Col>
        </Row>
      </Container>

      <Modal show={showKey} onHide={handleCloseKey}>
        <Modal.Header closeButton>
          <Modal.Title>Color Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-center">
              <div className="box school">School</div>
            </Row>
            <Row className="justify-content-center">
              <div className="box home">Home</div>
            </Row>
            <Row className="justify-content-center">
              <div className="box work">Work</div>
            </Row>
            <Row className="justify-content-center">
              <div className="box other">Other</div>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleCloseKey}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <TaskForm onSubmit={addTodo} />
      {!showAlert ? (
        <>
          <div className="task-list">
            <Task
              todos={todos}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          </div>

         
            <Toast
              onClose={() => setCheckedToast(false)}
              show={checkedToast}
              delay={3000}
              autohide
            >
              <Toast.Body>
                <Confetti className="confetti" />
                Woohoo, you've completed a task! Keep it up!
              </Toast.Body>
            </Toast>
        
        </>
      ) : (
        <Alert
          className="alert"
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <p>Oops, you tried adding an empty task</p>
        </Alert>
      )}
    </>
  );

}

export default TaskList;
