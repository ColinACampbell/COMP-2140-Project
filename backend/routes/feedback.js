const express = require('express')
const router = express.Router();
const feedbackController = require('./../controller/feedback')
const authMiddleWare = require('./../middleware/authentication');

router.use(authMiddleWare.jwtCheck);
router.post('/', feedbackController.createFeedback);
router.get('/',feedbackController.getAllFeedbacks);
router.get('/:id',feedbackController.getFeedback)

module.exports = router;