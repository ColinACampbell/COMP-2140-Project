exports.duplicateTitleCheck = async (res, title, Model, action) => {
    const existingMeetingAlerts = await Model.find({
        title: title
    });

    if (existingMeetingAlerts.length > 0)
        res.status(409).json({})
    else
        action(); // runs the create
}