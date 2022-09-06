const { User } = require('../database/models');
const tokenHelper = require('../helpers/token');

const createUser = async ({ displayName, email, password, image }) => {
  const result = await User.findOne({
    where: { email },
  });
  if (result) {
    return null;
  }
  const newUser = await User.create({ displayName, email, password, image });
  const token = tokenHelper.createToken({ email: newUser.email });
  return token;
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

module.exports = { createUser, getAllUsers };