import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import axios from "axios";
import Moment from "react-moment";

const TodoItem = ({ todo: { _id, text, complete, date }, setRefresh }) => {
  const deleteTodo = async () => {
    await axios.delete(`/api/todos/${_id}`);
    setRefresh(true);
  };

  const updateTodo = async () => {
    await axios.put(`/api/todos/${_id}`);
    setRefresh(true);
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center todo-container">
        <Col xs="11" md="5">
          <Card>
            <Card.Subtitle className="mt-2 text-muted">
              <Row>
                <Col xs={4}>
                  <Button
                    variant="success"
                    className="todo-action-btn btn-sm"
                    onClick={() => {
                      updateTodo();
                    }}
                  >
                    <strong>{complete ? "unmark" : "mark"}</strong>
                  </Button>
                </Col>
                <Col xs={4}>
                  <Moment format="DD, MMM YYYY">{date}</Moment>
                </Col>
                <Col xs={4}>
                  <Button
                    variant="danger"
                    className="todo-action-btn btn-sm"
                    onClick={() => deleteTodo()}
                  >
                    <strong>delete</strong>
                  </Button>
                </Col>
              </Row>
            </Card.Subtitle>
            <Card.Body className={complete ? "checked-card" : ""}>
              {text}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  setRefresh: PropTypes.func.isRequired
};

export default TodoItem;
