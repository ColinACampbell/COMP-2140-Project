const express = require('express')
const router = express.Router();
const meetingAlertController = require('./../controller/meeting-alert')

router.post('/',meetingAlertController.createMeetingAlert)
router.get('/',meetingAlertController.getMeetingAlerts)

module.exports = router;