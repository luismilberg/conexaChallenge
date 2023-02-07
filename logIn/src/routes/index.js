const express = require('express');
const userRoute = require('../components/users/users.route');
const authRoute = require('../components/auth/auth.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/users',
        route: userRoute
    }, {
        path: '/login',
        route: authRoute
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;