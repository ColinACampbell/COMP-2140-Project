const { Schema, model } = require("mongoose");
const mongooseConn = require('./index')

const feedbackSchema = new Schema({
    postedBy : {type: Schema.Types.ObjectId, ref: 'User'},
    asset_id: String,
    title : String,
    message : String,
})

module.exports = mongooseConn.model('Feedback',feedbackSchema)