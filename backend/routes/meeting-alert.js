const express = require('express')
const router = express.Router();
const meetingAlertController = require('./../controller/meeting-alert')

router.post('/',meetingAlertController.createMeetingAlert)
router.get('/',meetingAlertController.getMeetingAlerts);
router.put('/:id',meetingAlertController.editMeetingAlert);

module.exports = router;