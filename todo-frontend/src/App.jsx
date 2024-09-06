import React, { useEffect, useState } from "react";
import "./index.css";
import Create from "./Create";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);
  const handleTask = (id) => {
    axios
      .put("http://localhost:3000/update/" + id)
      .then(()=>location.reload())
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/delete/" + id)
      .then(()=>location.reload())
      .catch((err) => console.log(err));
  };
  return (
    <div className="home">
      <h2>To-Do-App</h2>
      <Create />
      <div>
        {todos.length === 0 ? (
          <h3>No task found</h3>
        ) : (
          todos.map((todo) => (
            <div className="task">
              <div className="checkbox">
                <button onClick={() => handleTask(todo._id)}>
                  {todo.done ? "Completed" : "Pending"}
                </button>
                <span>{todo.task}</span>
              </div>
              <div>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
