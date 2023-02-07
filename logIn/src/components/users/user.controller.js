const httpStatus = require('http-status');
const userService = require('./user.service');
const userDTO = require('./user.dto');
const Token = require('../../utils/Token');


const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(httpStatus.CREATED).send(userDTO.single(user));
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    const token = Token.getTokenFromRequest(req);
    const limit = req.query.limit;
    const page = req.query.page;
    try {
        const result = await userService.getUsers(limit, page, token);
        res.send(result);
    } catch (error) {
        res.status(error.statusCode || error.response.status || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.response.data });
    }
};


module.exports = {
    createUser,
    getUsers,
};