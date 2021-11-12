const express = require('express')
const router = express.Router();
const userController = require('./../controller/user')

router.post('/',userController.register)
router.post('/authenticate',userController.authenticate)

module.exports = router