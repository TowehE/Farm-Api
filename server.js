//import express
const express = require("express")

//require env
require("dotenv").config()

require('./dbConfg/dbconfig');

//create app from express module
const app = express()


//use json middle
app.use(express.json())

// import router
const animalRouter = require("./router/router")

app.get('/', (req, res) => {
    res.send("Welcome to Animal logIn API");
})

app.use("/api/v1", animalRouter)




const port = process.env.port


//listen to the port
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})



