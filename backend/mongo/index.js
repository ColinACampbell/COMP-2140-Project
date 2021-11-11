const mongoose = require('mongoose') // set up mongo connection
mongoose.connect('mongodb://localhost:27017/DamPlay');
mongoose.connection.on('error',(err)=>{
    console.log(err)
})
module.exports = mongoose;