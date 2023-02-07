const httpStatus = require('http-status');
const userService = require('../users/user.service');
const ApiError = require('../../utils/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const autenticarUsuario = async (authBody) => {
    const { email, password } = authBody;
    const user = await userService.getUserByEmail(email);
    const hashedUserPassword = user.password;
    let response = {};

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Check email or password');
    } else if (!bcrypt.compareSync(password, hashedUserPassword)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Check email or password');
    } else {
        const token = jwt.sign(
            {
                email: user.email,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "12h",
            }
        );
        response.token = token;
        return response;
    }
}


module.exports = {
    autenticarUsuario,
}