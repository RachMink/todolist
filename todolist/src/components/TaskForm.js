import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";

function TaskForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [dueDate, setDueDate] = useState("");
  const [taskType, setTaskType] = useState("");

  const inputRef = useRef(null);
  const dateRef = useRef(null);
  const typeRef =useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleInputChange = (e) => {
    setInput(e.target.value);
    
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
   };
  
   const handleTypeChange = (e) => {
       console.log(e.target.name);
       setTaskType(e.target.name);
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
    setDueDate("");
    setTaskType(null);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleInputChange}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          <Form.Control
            type="date"
            value={dueDate}
            name="dueDate"
            ref={dateRef}
            onChange={handleDateChange}
            className="todo-date edit"
          />
          <div key={`inline-radio`} className="mb-3">
            <Form value={taskType} onChange={handleTypeChange} ref={typeRef}>
              <Form.Check
                inline
                label="School"
                value={taskType}
                name="School"
                type="radio"
                id="inline-radio-School"
                className="todo-type School"
              />
              <Form.Check
                inline
                label="Work"
                value={taskType}
                name="Work"
                type="radio"
                id="inline-radio-Work"
                className="todo-type Work"
                //onChange={handleTypeChange}
              />
              <Form.Check
                inline
                value={taskType}
                label="Home"
                name="Work"
                type="radio"
                id="inline-radio-Home"
                className="todo-type Home"
                //onChange={handleTypeChange}
              />
            </Form>
          </div>
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleInputChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          <Form.Control
            type="date"
            name="dueDate"
            ref={dateRef}
            value={dueDate}
            onChange={handleDateChange}
            className="todo-date"
          />
          <div key={`inline-radio`} className="mb-3">
            <Form value={taskType} onChange={handleTypeChange} ref={typeRef}>
              <Form.Check
                inline
                label="School"
                //value={taskType}
                name="School"
                type="radio"
                id="inline-radio-School"
                className="todo-type School"
                onChange={handleTypeChange}
              />
              <Form.Check
                inline
                label="Work"
                //value={taskType}
                name="Work"
                type="radio"
                id="inline-radio-Work"
                className="todo-type Work"
                onChange={handleTypeChange}
              />
              <Form.Check
                inline
                //value={taskType}
                label="Home"
                name="Home"
                type="radio"
                id="inline-radio-Home"
                className="todo-type Home"
                onChange={handleTypeChange}
              />
            </Form>
          </div>
          <button onClick={handleSubmit} className="todo-button">
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TaskForm;
