import React, { useState } from "react";
import { addNewTask } from "../redux/taskSlice";
import { Link } from "react-router-dom";

function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/new-task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });
  
        if (response.ok) {
          console.log('Item added successfully');
         
          setTitle('');
          setDescription('');
        } else {
          throw new Error('Failed to add item');
        }
      } catch (error) {
        console.error('Error adding item:', error);
      }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
        <h2>Create Task</h2>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ resize: 'vertical' }}
          required
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <Link to='/tasks'>Go To all tasks</Link>
    </div>
  );
}

export default NewTask;
