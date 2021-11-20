const express = require('express')
const router = express.Router();
const userController = require('./../controller/user')


/**
 *  @swagger
 *  /user:
 *    post:
 *      description: Creates a user
 *      responses: 
 *        '201':
 *           description: Success
 *   
 */
router.post('/',userController.register)


/**
 *  @swagger
 *  /user/authenticate:
 *    post:
 *      description: Logs In A User
 *      responses: 
 *        '200':
 *           description: Success
 *   
 */
router.post('/authenticate',userController.authenticate)

module.exports = router