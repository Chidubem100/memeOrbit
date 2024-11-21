const bcrypt = require('bcrypt');
const { User } = require('../models');


const createUser = async ({ username, email, password,referralLink, country, verificationToken }) => {
    // Check if the user already exists
    const existingEmail = await User.findOne({ where: { email } });
    const existingUsername = await User.findOne({where: {username}})
    
    if(existingEmail){
        throw new Error('Email is already taken');
    }

    if (existingUsername) {
        throw new Error('Email is already in use');
    }

    // Hash the password (optional, using bcrypt for example)
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        country,
        referralLink,
        verificationToken
    });

    return user;
};

const findUserByEmail = async({email}) =>{
    const user = await User.findOne({where: {email} });

    if(!user){
        throw new Error("User not found!")
    }
    return user;
}

const findUserById = async({userId}) =>{
    const user = await User.findOne({where: {userId} });

    if(!user){
        throw new Error("User not found!")
    }
    return user;
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserById
};
