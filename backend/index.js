const express = require('express')
const userRoutes = require('./routes/user')
const assetRoutes = require('./routes/asset')

const app = express(); // create the app

app.use(express.json());
app.use('/user',userRoutes)
app.use('/asset',assetRoutes)

const port = 3000 | process.env.PORT // define a port to listen for the process (net-centric stuff)
app.listen(port,(err)=>{
    if (err) throw err; // if there are any errors, just throw them and don't bother listen
    console.log("Server Started")
})