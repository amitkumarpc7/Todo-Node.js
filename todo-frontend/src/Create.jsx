import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  const [task, setTask] = useState("");
  // console.log(task);
  const addTask = () => {
    axios
      .post("http://localhost:3000/add", { task: task })
      .then(() => location.reload())
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
        className="input_bar"
      ></input>
      <button onClick={addTask} className="form_button">
        Add
      </button>
    </div>
  );
};

export default Create;
