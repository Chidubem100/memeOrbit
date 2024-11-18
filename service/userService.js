const { User } = require('../models');

const createUser = async ({ name, email, password }) => {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email is already in use');
    }

    // Hash the password (optional, using bcrypt for example)
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return user;
};

module.exports = {
    createUser
};
