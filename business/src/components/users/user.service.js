const userDTO = require('./user.dto');
const repository = require('./user.repository');


const getUsers = async (limit = 10, page = 1, email = '') => {

    limit = parseInt(limit) > 0 ? parseInt(limit) : 10;
    page = parseInt(page) > 0 ? parseInt(page) : 1;

    const {users, totalElements} = await repository.getUsers(limit, page, email);

    const response = {
        users: userDTO.multiple(users),
        filteredElements: users.length,
        totalElements,
        page,
        limit
    }

    return response;
}



module.exports = {
    getUsers,
}