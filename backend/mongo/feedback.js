const { Schema, model } = require("mongoose");
const mongooseConn = require('./index')

const feedbackReplySchema = new Schema({
    postedBy: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    message: String,
    time:Number
})

const feedbackSchema = new Schema({
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    asset_id: String,
    title: String,
    message: String,
    replies : [feedbackReplySchema]
})

exports.Feedback = mongooseConn.model('Feedback', feedbackSchema)
exports.FeedbackReply = mongooseConn.model('FeedbackReply',feedbackReplySchema)