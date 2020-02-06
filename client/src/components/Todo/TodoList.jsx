import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import Spinner from "../Spinner/Spinner";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/todos");
      setTodos(res.data);
      setRefresh(false);
    };
    fetchData();
  }, [refresh]);
  return (
    <div>
      {refresh ? (
        <Spinner />
      ) : (
        <Fragment>
          <div>{todos.filter(todo => !todo.complete).length} items left</div>
          {todos.map(todo => (
            <TodoItem key={todo._id} todo={todo} setRefresh={setRefresh} />
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default TodoList;
