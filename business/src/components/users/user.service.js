const userDTO = require('./user.dto');
const repository = require('./user.repository');


const getUsers = async (limit = 10, page = 1) => {

    limit = parseInt(limit) > 0 ? parseInt(limit) : 10;
    page = parseInt(page) > 0 ? parseInt(page) : 0;

    const {users, totalElements} = await repository.getUsers(limit, page);


    const response = {
        users: userDTO.multiple(users),
        totalElements,
        page,
        limit
    }

    return response;
}



module.exports = {
    getUsers,
}