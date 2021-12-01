const express = require('express')
const router = express.Router();
const meetingAlertController = require('./../controller/meeting-alert')
const authMiddleWare = require('./../middleware/authentication');

router.use(authMiddleWare.jwtCheck);
router.post('/',meetingAlertController.createMeetingAlert)
router.get('/',meetingAlertController.getMeetingAlerts);
router.put('/:id',meetingAlertController.editMeetingAlert);

module.exports = router;