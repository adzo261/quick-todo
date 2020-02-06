import React, { useState } from "react";
import TodoList from "./TodoList";
import axios from "axios";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Todo = () => {
  const [todoText, setTodoText] = useState("");

  const postTodo = async e => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    await axios.post("/api/todos", { text: todoText }, config);
    console.log("Submit");
  };

  return (
    <div>
      <Form onSubmit={e => postTodo(e)}>
        <Container>
          <Form.Row className="justify-content-center align-items-center">
            <Form.Group as={Col} xs={11} md={5}>
              <Form.Control
                type="text"
                placeholder="Add new todo..."
                value={todoText}
                onChange={e => {
                  setTodoText(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" variant="primary" id="add-todo-btn">
                Add
              </Button>
            </Form.Group>
          </Form.Row>
        </Container>
      </Form>
      <TodoList />
    </div>
  );
};

export default Todo;
