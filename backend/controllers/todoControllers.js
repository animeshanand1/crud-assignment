const Todo = require("../models/todoSchema");

const addItem = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = await Todo.create({
      title: title,
      description: description,
    });
    newTask.save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const allTasks = async (req, res) => {
  try {
    const Tasks = await Todo.find({});
    res.status(200).json({ message: Tasks });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const editTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const task = await Todo.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title;
    task.description = description;

    await task.save();

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Todo.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.remove();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


module.exports = { addItem, allTasks, editTask,deleteTask };
