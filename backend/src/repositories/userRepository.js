//src/repositories/userRepository.js
const prisma = require("../config/prisma");

const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({ where: { email } });
};

const createUser = async (userData) => {
    return await prisma.user.create({ data: userData });
};

const findUserById = async (id) => {
    return await prisma.user.findUnique({ where: { id } });
};

module.exports = { findUserByEmail, createUser, findUserById };
