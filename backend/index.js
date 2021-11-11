const express = require('express')
const User = require('./mongo/user')

const app = express(); // create the app

// Listen for http requests at '/'
app.get('/',(req,res)=>{
    const okStatus = 200
    res.status(okStatus).send("Hello World, welcome to the project!!")
})

app.get('/user',async (req,res)=>{
    const query = await User.findOne({
        name:"Colin"
    })
    console.log(query)
    res.status(200).json(query)
})

const port = 3000 | process.env.PORT // define a port to listen for the process (net-centric stuff)
app.listen(port,(err)=>{
    if (err) throw err; // if there are any errors, just throw them and don't bother listen
    console.log("Server Started")
})