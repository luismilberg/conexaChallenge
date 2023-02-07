const express = require('express');
const authController = require('./auth.controller');
const authValidation = require('./auth.validation');

const router = express.Router();

router
    .route('/')
    .post(authValidation.authUserValidation(), authValidation.validate, authController.authenticateUser)


module.exports = router;