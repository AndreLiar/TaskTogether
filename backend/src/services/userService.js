//src/services/userService.js
const { hashPassword, comparePassword, generateToken } = require("../utils/auth");
const userRepository = require("../repositories/userRepository");

const registerUser = async (name, email, password) => {
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await hashPassword(password);
    const newUser = await userRepository.createUser({ name, email, password: hashedPassword });

    return generateToken(newUser);
};

const loginUser = async (email, password) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return generateToken(user);
};

const getUserProfile = async (id) => {
    return await userRepository.findUserById(id);
};

module.exports = { registerUser, loginUser, getUserProfile };
