const { Schema, model } = require("mongoose");
const mongooseConn = require('./index')

const feedbackSchema = new Schema({
    owner_id: String,
    asset_id: String,
    title : String,
    message : String
})

module.exports = mongooseConn.model('Feedback',feedbackSchema)