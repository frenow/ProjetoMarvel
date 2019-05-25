const express = require('express');
const router = express.Router();
const facebookRouter = require('./facebook');
const steamRouter = require('./steam');

router.use('/facebook', facebookRouter);
router.use('/steam', steamRouter);
module.exports = router;