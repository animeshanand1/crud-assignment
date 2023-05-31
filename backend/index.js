const express = require('express');
const mongoose=require('mongoose')
const cors=require('cors')
// const dotenv=require('dotenv');
const User = require('./models/userSchema');
const {  login } = require('./controllers/userControllers');
const {addItem,allTasks,editTask, deleteTask}= require('./controllers/todoControllers');


const app = express();
app.use(cors())
app.use(express.json())
// dotenv.config()
const PORT= 5000
const MONGO_URI='mongodb+srv://animeshanand9:UivVLgSusjA0TT4X@cluster0.pua2oqb.mongodb.net/todo-database?retryWrites=true&w=majority'



// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database!');
    
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });


  // Define routes
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
// app.get('/users',async(req,res)=>{
//     const users=await User.find({})
//     res.send(users)
// })

app.post('/new-task',addItem)
app.get('/all-tasks',allTasks)
app.post('/login',login)
app.delete('/delete-task/:id',deleteTask)
app.put('/tasks/:id',editTask)

// app.post('/newproduct',uploadProduct)
// app.get('/allproducts',getProducts)



// Start the server
app.listen(PORT, () => {
  
  // Product.insertMany(data)
  console.log(`Server is running on port ${PORT}`);
});
