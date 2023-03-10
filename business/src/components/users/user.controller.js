const userService = require('./user.service');

const getUsers = async (req, res) => {
    const limit = req.query.limit;
    const page = req.query.page;
    const email = req.query.email;
    try {
        const result = await userService.getUsers(limit, page, email);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
};

module.exports = {
    getUsers,
};