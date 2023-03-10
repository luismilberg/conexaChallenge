const axios = require('axios');
const Token = require('../../utils/Token');
const repository = require('./user.repository');

const createUser = async (userBody) => {
    const user = await repository.createUser(userBody);
    return user;
}

const getUsers = async (limit = 10, page = 1, email = '',token) => {
    let url = `${process.env.APIGATEWAY}/business/users?limit=${limit}&page=${page}`;
    if(email.length > 0) {
        url += `&email=${email}`
    }
    const { data } = await axios.get(url, Token.getHeaderWithToken(token));
    return data;
}

const updateUserById = async (userId, updateBody) => {
    const user = await repository.updateUserById(userId, updateBody);
    return user;
}

const deleteUserById = async (userId) => {
    const user = repository.deleteUserById(userId);
    return user;
}

const getUserByEmail = async (email) => {
    const user = repository.getUserByEmail(email);
    return user;
}

module.exports = {
    createUser,
    getUsers,
    getUserByEmail,
    updateUserById,
    deleteUserById,
}