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
          variant="primary"
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
              <Container gap="2">
                <Row className="justify-content-center">
                  <Col sm={8}>
                    {/* <div className="todo-input edit"> */}
                    <Form.Control
                      type="text"
                      placeholder="Add new item"
                      value={input}
                      onChange={handleInputChange}
                      name="text"
                      //ref={inputRef}
                    />
                  </Col>
                </Row>

                <Row className="justify-content-center">
                  <Col sm={5}>
                    <InputGroup className="mb-3" onChange={handleDateChange}>
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

                <Row>
                  <Col lg={12} className="justify-content-center">
                    <div key={`inline-radio`} className="to-do type">
                      <InputGroup className="mb-3">
                        <InputGroup.Text>task type</InputGroup.Text>
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
                            //checked={taskType === "School"}
                            id="inline-radio-School"
                            className="todo-type School"
                          />
                          <Form.Check
                            inline
                            label="Work"
                            value="Work"
                            name="type"
                            type="radio"
                            //checked={taskType === "Work"}
                            id="inline-radio-Work"
                            className="todo-type Work"
                            //onChange={handleTypeChange}
                          />
                          <Form.Check
                            inline
                            value="Home"
                            label="Home"
                            name="type"
                            type="radio"
                            //checked={taskType === "Home"}
                            id="inline-radio-Home"
                            className="todo-type Home"
                            //onChange={handleTypeChange}
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
                variant="outline-primary"
              >
                Close
              </Button>
              <Button onClick={handleSubmit}>Add</Button>
            </Modal.Footer>
          </Modal>
        ) : null}
      </Form>
    </>
  );
}

export default TaskForm;
