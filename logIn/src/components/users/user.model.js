const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        }
    }
);


userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 10);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
