const express = require('express');
const authMiddleWare = require('./../middleware/authentication');
const validationMiddleWare = require('./../middleware/body-validation');

const assetController = require('./../controller/asset');
const router = express.Router();

router.use(authMiddleWare.jwtCheck); // set up this middleware for this set of routes
router.use(validationMiddleWare);

router.get('/',assetController.getAssets);
router.get('/:id',assetController.getAsset);
router.put('/:id',assetController.updateAsset);
router.post('/', assetController.uploadAsset); // posting at '/'  just creates the resource

module.exports = router;
