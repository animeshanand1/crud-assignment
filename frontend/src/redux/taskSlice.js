import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload;
      const task = state.tasks.find((task) => task._id === id);
      if (task) {
        task.title = title;
        task.description = description;
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== id);
    },
    markAsCompleted: (state, action) => {
      const id = action.payload;
      const task = state.tasks.find((task) => task._id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    addNewTask:(state,action)=>{
      const newTask = action.payload;
      state.tasks.push(newTask);
      
    }
  },
});

export const { setTasks,deleteTask,markAsCompleted,editTask,addNewTask } = taskSlice.actions;

export default taskSlice.reducer;
