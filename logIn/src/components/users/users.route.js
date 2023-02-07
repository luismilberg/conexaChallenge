const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('./user.controller');
const userValidation = require('./user.validation');

const router = express.Router();

router
    .route('/')
    .post(userValidation.createUserValidation(), userValidation.validate, userController.createUser)
    .get(auth, userController.getUsers);

module.exports = router;