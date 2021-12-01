const express = require('express')
const router = express.Router();
const meetingAlertController = require('./../controller/meeting-alert')
const validationMiddleWare = require('./../middleware/body-validation');
const authMiddleWare = require('./../middleware/authentication');

router.use(validationMiddleWare);
router.use(authMiddleWare.jwtCheck);
router.post('/',meetingAlertController.createMeetingAlert)
router.get('/',meetingAlertController.getMeetingAlerts);
router.put('/:id',meetingAlertController.editMeetingAlert);
router.delete('/:id',meetingAlertController.deleteMeetingAlert)

module.exports = router;