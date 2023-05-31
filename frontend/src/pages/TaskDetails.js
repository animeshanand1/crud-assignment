import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../redux/taskSlice";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task._id === id)
  );

  const dispatch = useDispatch();
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    task.description
  );

  const handleEdit = async () => {
    try {
      const updatedTask = {
        title: updatedTitle,
        description: updatedDescription,
      };

      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      // Dispatch the editTask action to update the task in Redux store
      dispatch(editTask(updatedTask));

      navigate("/tasks"); // Redirect to task list after successful update
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ...

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>

      <input
        type="text"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
      />
      <textarea
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
      ></textarea>

      <button onClick={handleEdit}>Save Changes</button>
      <button onClick={() => navigate("/tasks")}>Go To Task List</button>
    </div>
  );
}

export default TaskDetails;
