import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";

import TaskLists from "./pages/TaskLists";
import TaskDetails from "./pages/TaskDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewTask from "./pages/NewTask";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tasks" element={<TaskLists />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/new-task" element={<NewTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
