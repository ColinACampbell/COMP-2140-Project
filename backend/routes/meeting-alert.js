const express = require('express')
const router = express.Router();
const meetingAlertController = require('./../controller/meeting-alert')
const validationMiddleWare = require('./../middleware/body-validation');

router.use(validationMiddleWare);


router.post('/',meetingAlertController.createMeetingAlert)
router.get('/',meetingAlertController.getMeetingAlerts);
router.put('/:id',meetingAlertController.editMeetingAlert);
router.delete('/:id',meetingAlertController.deleteMeetingAlert)

module.exports = router;