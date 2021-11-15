const express = require('express')
const router = express.Router();
const feedbackController = require('./../controller/feedback')
const authMiddleWare = require('./../middleware/authentication');

router.use(authMiddleWare.jwtCheck);
router.post('/', feedbackController.createFeedback);

module.exports = router;