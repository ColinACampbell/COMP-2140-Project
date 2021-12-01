const MeetingAlert = require('./../mongo/meeting-alert')

const duplicateTitleCheck = async (res, title, Model, action) => {
    const existingMeetingAlerts = await Model.find({
        title: title
    });

    if (existingMeetingAlerts.length > 0)
        res.status(409).json({})
    else
        action(); // runs the create
}

exports.createMeetingAlert = async (req, res) => {
    const { attendees, meetingLink, date, title, sender } = req.body;
    // Write code to check if any inputs are valid
    duplicateTitleCheck(res, title, MeetingAlert, () => {
        MeetingAlert.create({
            title,
            sender,
            attendees,
            meetingLink,
            date
        }).then((meetingAlert) => {
            res.status(201).json(meetingAlert)
        }).catch((err) => {
            res.status(500).json({})
        })
    })

}

exports.getMeetingAlerts = (req, res) => {
    MeetingAlert.find().populate([
        {
            path: "sender",
            select: "name email _id"
        },
        {
            path: "attendees",
            select: "name email _id"
        }
    ]).exec((err, alerts) => {
        res.status(200).json(alerts)
    })
}

exports.editMeetingAlert = (req, res) => {
    const meetingAlertId = req.params.id;
    const { meetingLink, date, attendees, title } = req.body

    console.log(title)

    duplicateTitleCheck(res, title, MeetingAlert, () => {
        MeetingAlert.findOne({
            _id: meetingAlertId
        }).then((meetingAlert) => {
            if (meetingAlert === null || meetingAlert === undefined) {
                res.status(404).json({})
            } else {
                meetingAlert.title = title;
                meetingAlert.meetingLink = meetingLink;
                meetingAlert.date = date;
                meetingAlert.attendees = attendees
                meetingAlert.save();
                res.status(200).json({})
            }
        })
    })

}

exports.deleteMeetingAlert = (req, res) => {
    const meetingId = req.params.id;
    MeetingAlert.deleteOne({
        _id: meetingId
    }, () => {
        res.status(200).json({ message: "Item was deleted" })
    })
}