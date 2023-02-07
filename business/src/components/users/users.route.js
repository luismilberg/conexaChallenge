const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('./user.controller');

const router = express.Router();

router
    .route('/')
    .get(auth, userController.getUsers);

module.exports = router;