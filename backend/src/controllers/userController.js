//src/controllers/userController.js

const userService = require("../services/userService");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const token = await userService.registerUser(name, email, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userService.loginUser(email, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await userService.getUserProfile(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
