// Importing express
const express = require('express')
// importing cors to enable cross origin requests
const cors = require('cors')
// importing connecting function of mongodb
const connectDb = require('./config/dbConnection')
// importing and configuring dotenv 
const dotenv = require('dotenv').config()

// Function call to connect server with db
connectDb();

// Created an instance of express
const app = express()

// loading environment variable from .env file and assigning it to a port variable
const port = process.env.PORT

// middleware to enable cross origin requests
app.use(cors());

// Middleware to parse json data in the request body
app.use(express.json())
// Setting up middleware to handle URL-encoded data
app.use(express.urlencoded({extended:true}))

// Route handlers
app.use('/', require('./routes/authRoutes'))

// listen method is called to start the server 
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})