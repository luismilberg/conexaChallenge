const httpStatus = require('http-status');
const authService = require('./auth.service');
const authDto = require('./auth.dto');


const authenticateUser = async (req, res, next) => {
    try {
        const auth = await authService.autenticarUsuario(req.body);
        res.status(httpStatus.OK).send(authDto.single(auth));
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
}

module.exports = {
    authenticateUser,
};