const express = require("express");
const User = require("../models/userSchema");

// const signup = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "Email already exists" });
//     }

//     // Create a new user
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password,
//     });

//     // Save the user to the database
//     await newUser.save();

//     res.status(201).json({ message: "User created successfully", alert: true });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create user", alert: false });
//   }
// };

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const existingUser = await User.findOne({ userName: userName });
    if (existingUser && existingUser.password === password) {
      // Successful login
      res.status(200).json({ message: "Login successful" ,alert:true});
    }
    else{
      res.status(501).json({message:"Login failed", alert:false})
    }
  } catch (error) {
    res.status(500).json({ message: error, alert:false });
  }
};

module.exports = { login };
