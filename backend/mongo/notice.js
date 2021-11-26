const { Schema } = require("mongoose");
const mongooseConn = require('./index')

const noticeSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    title:String,
    message: String,
    time: Number
})

module.exports = mongooseConn.model('Notice',noticeSchema);