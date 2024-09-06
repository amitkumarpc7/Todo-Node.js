const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Model/Todo");

const app = express();
app.use(cors());
app.use(express.json());

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/task");
    console.log("Connected to server");
  } catch (e) {
    console.log(e);
  }
};
app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
// for updating
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// for deleting
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  connectDb();
  console.log(`Server is running at ${PORT}`);
});
