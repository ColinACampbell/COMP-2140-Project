const { Schema } = require("mongoose");
const mongooseConn = require('./index')

const schema = new Schema({
    name : String,
    email: String,
    password: String
})

module.exports = mongooseConn.model('User',schema)