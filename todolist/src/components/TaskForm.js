import React, { useState, useEffect, useRef } from "react";
import { Button, Row, Col, Container, Stack, FormGroup, InputGroup, FormControl, Modal } from "react-bootstrap";
import { Calendar2, InputCursor, InputCursorText } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";


function TaskForm(props) {
  const date = new Date();
  const [addNewModal, setAddNewModal] = useState(false);
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [dueDate, setDueDate] = useState(`${date.getFullYear()} - ${date.getMonth()+1} - ${date.getDate()}`);
  const [taskType, setTaskType] = useState("");
  
  const dateRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
   };
  
   const handleTypeChange = (e) => {
       console.log(e.target.value);
       setTaskType(e.target.value);
    }; 

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      date: dueDate,
      type: taskType,
    });
    setInput("");
    setDueDate(
      `${date.getFullYear()} - ${date.getMonth()+1} - ${date.getDate()}`
    );
    setTaskType("");//why's this not responding?
    setAddNewModal(false);
  };

  return (
    <>
      <Container>
        <Button
          className="add"
          variant="outline-light"
          onClick={() => setAddNewModal(true)}
        >
          Add new
        </Button>
      </Container>
      <Form onSubmit={handleSubmit} className="todo-form">
        {addNewModal ? (
          <Modal show={addNewModal} onHide={() => setAddNewModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Task
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="show-grid">
              <Container fluid>
                <Row className="justify-content-center task-input">
                  <Col sm={8}>
                    {/* <div className="todo-input edit"> */}
                    <Form.Control
                      type="text"
                      placeholder="Add new item"
                      value={input}
                      onChange={handleInputChange}
                      name="text"
                      className="text-input"
                      //ref={inputRef}
                    />
                  </Col>
                </Row>

                <Row className="justify-content-center task-input">
                  <Col sm={5}>
                    <InputGroup onChange={handleDateChange}>
                      <InputGroup.Text id="basic-addon1">
                        <Calendar2 />
                      </InputGroup.Text>
                      <Form.Control
                        size="sm"
                        type="date"
                        value={dueDate}
                        name="dueDate"
                        ref={dateRef}
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="justify-content-center task-input">
                  <Col lg={12}>
                    <div key={`inline-radio`} className="todo-type">
                      <InputGroup>
                        {/* <InputGroup.Text>type</InputGroup.Text> */}
                        <FormGroup
                          name="type"
                          value={taskType}
                          onChange={handleTypeChange}
                          className="todo-task-radio-text"
                        >
                          <Form.Check
                            inline
                            label="School"
                            value="School"
                            name="type"
                            type="radio"
                            id="inline-radio-School"
                            className="todo-type school"
                          />
                          <Form.Check
                            inline
                            label="Work"
                            value="Work"
                            name="type"
                            type="radio"
                            id="inline-radio-Work"
                            className="todo-type work"
                            //onChange={handleTypeChange}
                          />
                          <Form.Check
                            inline
                            value="Home"
                            label="Home"
                            name="type"
                            type="radio"
                            id="inline-radio-Home"
                            className="todo-type home"
                            //onChange={handleTypeChange}
                          />
                          <Form.Check
                            inline
                            label="Other"
                            value="Other"
                            name="type"
                            type="radio"
                            id="inline-radio-Other"
                            className="todo-type other"
                          />
                        </FormGroup>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  setAddNewModal(false);
                }}
                variant="outline-dark"
              >
                Close
              </Button>
              <Button variant="outline-dark" onClick={handleSubmit}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}
      </Form>
    </>
  );
}

export default TaskForm;
