const userService = require('../services/userService');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userService.createUser({ name, email, password });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    signup
};
