const httpStatus = require('http-status');
const User = require('./user.model');
const ApiError = require('../../utils/ApiError');

const createUser = async (userBody) => {
    const user = await getUserByEmail(userBody.email)
    if (!!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User email is already taken');
    }
    return User.create(userBody);
}

const getUserByEmail = async (email) => {
    return User.findOne({ email });
}

const getUserById = async (id) => {
    return User.findById(id);
}

const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
    }
    if (updateBody.email && (await User.isemailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
}

const deleteUserById = async (userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
    }
    await user.remove();
    return user;
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
}