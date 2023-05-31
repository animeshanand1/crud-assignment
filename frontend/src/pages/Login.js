import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate=useNavigate()
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (response.ok) {
        // Successful login
        console.log("Login successful");
        navigate('/tasks')
        
      } else {
        // Failed login
        console.error("Login failed:", response.statusText);
        alert('Invalid credentials ')
        }
    } catch (error) {
      console.error("Login failed:", error);
       }

   
   
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <div className="login-form">
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <label htmlFor="password">Password(min 6 characters):</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
