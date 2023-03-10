const User = require('./user.model');

const getUsers = async (limit = 10, page = 1, email = '') => {

    limit = parseInt(limit) > 0 ? parseInt(limit) : 10;
    page = parseInt(page) > 0 ? parseInt(page) : 0;
    let filters = {};
    
    if (email.length > 0) {
        filters = {
            email: {
                '$regex': email,
                $options: 'i'
            }
        }
    }

    const offset = page > 0 ? limit * (page - 1) : 0;

    const [users, totalElements] = await Promise.all([
        User.find(filters).skip(offset).limit(limit),
        User.countDocuments()
    ]);


    const response = {
        users,
        totalElements,
    }

    return response;
}


const getUserById = async (id) => {
    return User.findById(id);
}

const getUserByEmail = async (email) => {
    return User.findOne({ email });
}

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
}