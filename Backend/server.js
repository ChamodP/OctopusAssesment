require("dotenv").config();

const express = require('express')
const loginRoutes = require('./Routes/Login') 
const usersRoutes = require('./Routes/Users') 


const app = express()
const port = process.env.PORT

// midddleware
app.use(express.json()); // Add middleware to parse JSON requests


// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use('/api/users', usersRoutes);
app.use('/api/login', loginRoutes);

