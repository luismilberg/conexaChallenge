const express = require('express');
const apicache = require("apicache");
const auth = require('../../middlewares/auth');
const userController = require('./user.controller');
const userValidation = require('./user.validation');

const router = express.Router();
const cache = apicache.middleware

router
    .route('/')
    .post(
        userValidation.createUserValidation(),
        userValidation.validate,
        userController.createUser
    )
    .get(
        auth,
        cache(),
        userController.getUsers
    );

module.exports = router;