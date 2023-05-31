import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, setTasks } from "../redux/taskSlice";



const DeleteButton = ({ value, row }) => {
  const dispatch = useDispatch();
  const handleDelete = useCallback(() => {
     dispatch(deleteTask(row._id));
  }, [dispatch, row._id]);

  return (
    <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white", padding: "5px" }}>
      Delete
    </button>
  );
};

const columns = [
  { field: "_id", headerName: "ID", width: 300 },
  { field: "title", headerName: "Title", width: 300 },
  {
    field: "description",
    headerName: "Description",
    width: 400,
    renderCell: (params) => {
      const item = params.row;
      return <Link to={`/tasks/${item._id}`}>{params.value}</Link>;
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: DeleteButton,
  },
];

function TaskLists() {
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("http://localhost:5000/all-tasks")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTasks(data.message));
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const handleDelete = (taskId) => {
    fetch(`http://localhost:5000/tasks/${taskId}`, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => {
        dispatch(deleteTask(taskId));
        fetchTasks(); // Call fetchTasks again to refresh the tasks from the server
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div>
      <div style={{ height: 500, width: "100%", background: "lightyellow", color: "red" }}>
        <DataGrid rows={tasks} columns={columns} getRowId={(row) => row._id} />
      </div>
      <button onClick={() => navigate("/new-task")} style={{ width: "200px", backgroundColor: "orange" }}>
        Add New Task
      </button>
    </div>
  );
}



export default TaskLists;
