const express = require('express')
const router = express.Router();
const noticeController = require('./../controller/notice')
const authMiddleWare = require('./../middleware/authentication');
const validationMiddleWare = require('./../middleware/body-validation');

router.use(validationMiddleWare);


router.use(authMiddleWare.jwtCheck);
router.post('/', noticeController.createNotice);
router.get('/', noticeController.getNotices);
router.get('/:id', noticeController.getNotice);
router.put('/:id', noticeController.updateNotice);

module.exports = router;