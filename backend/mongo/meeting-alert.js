const { Schema } = require("mongoose");
const mongooseConn = require('./index')

const meetingAlertSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: "User"},
    attendees: [{ type: Schema.Types.ObjectId, ref: "User"}],
    date: String,
    meetingLink:String,
    title: String
})

module.exports = mongooseConn.model('MeetinAlert',meetingAlertSchema);
