const MeetingAlert = require('./../mongo/meeting-alert')

exports.createMeetingAlert = (req,res) => {
    const {attendees, meetingLink, date, title, sender } = req.body;
    // Write code to check if any inputs are valid
    MeetingAlert.create({
        title,
        sender,
        attendees,
        meetingLink,
        date
    }).then((meetingAlert)=>{
        res.status(201).json(meetingAlert)
    }).catch((err)=>{
        res.status(500).json({})
    })
}

exports.getMeetingAlerts = (req,res) => {
    MeetingAlert.find().populate([
        {
            path:"sender",
            select: "name email _id"
        },
        {
            path:"attendees",
            select: "name email _id"
        }
    ]).exec((err,alerts)=>{
        res.status(200).json(alerts)
    })
}