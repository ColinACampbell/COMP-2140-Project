const express = require('express');
const authMiddleWare = require('./../middleware/authentication');
const assetController = require('./../controller/asset');
const router = express.Router();

router.use(authMiddleWare.jwtCheck); // set up this middleware for this set of routes

router.get('/',assetController.getAssets);

module.exports = router;