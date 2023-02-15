const httpStatus = require('http-status');
const userService = require('../users/user.service');
const ApiError = require('../../utils/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const autenticarUsuario = async (authBody) => {
    const { email, password } = authBody;
    const dbUser = await userService.getUserByEmail(email);

    if (!dbUser || !bcrypt.compareSync(password, dbUser.password)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Check email or password');
    } else {
        const token = jwt.sign(
            {
                email: dbUser.email,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "12h",
            }
        );
        let response = {};
        response.token = token;
        return response;
    }
}


module.exports = {
    autenticarUsuario,
}