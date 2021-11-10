const express = require('express')

const app = express(); // create the app

// Listen for http requests at '/'
app.get('/',(req,res)=>{
    const okStatus = 200
    res.status(okStatus).send("Hello World, welcome to the project!!")
})

const port = 3000 | process.env.PORT // define a port to listen for the process (net-centric stuff)
app.listen(port,(err)=>{
    if (err) throw err; // if there are any errors, just throw them and don't bother listen
    console.log("Server Started")
})