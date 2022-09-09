require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const CustomError = require('../errors/CustomError');

const { JWT_SECRET } = process.env;
const JWT_OPTIONS = { algorithm: 'HS256', expiresIn: '1d' };

const emailValidation = async (email, password) => {
  const result = await User.findOne({ where: { email, password } });
  if (!result) return null;
  return result;
};

const verifyToken = async (email) => {
  const users = await User.findAll();
  const emails = await users.map((user) => user.dataValues.email);
  if (emails.includes(email)) {
    throw new CustomError(409, 'User already registered');
  }
};

const createToken = async (user) => {
  const { email } = user;
  const token = jwt.sign({ email }, JWT_SECRET, JWT_OPTIONS);
  return token;
};

const createUser = async ({ displayName, email, password, image }) => {
  const result = await User.findOne({
    where: { email },
  });
  if (result) {
    return null;
  }
  const newUser = await User.create({ displayName, email, password, image });
  const token = createToken({ email: newUser.email });
  return token;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const getUserById = async (id) => {
  const result = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  if (!result) {
    return null;
  }
  return result;
};

const removeUser = async ({ userId }) => {
  const id = userId;
  const result = await User.findByPk(id);
  if (!result) {
    return null;
  }
  await User.destroy({ where: { id } });
  return true;
};

module.exports = {
  emailValidation,
  verifyToken,
  createToken,
  createUser,
  getAllUsers,
  getUserById,
  removeUser,
};
