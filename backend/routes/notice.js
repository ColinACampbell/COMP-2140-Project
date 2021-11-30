const express = require('express')
const router = express.Router();
const noticeController = require('./../controller/notice')
const authMiddleWare = require('./../middleware/authentication');

router.use(authMiddleWare.jwtCheck);
router.post('/', noticeController.createNotice);
router.get('/', noticeController.getNotices);
router.get('/:id', noticeController.getNotice);
router.put('/:id', noticeController.updateNotice);

module.exports = router;