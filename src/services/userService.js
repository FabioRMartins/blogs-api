const { User } = require('../database/models/user');

const newUser = async (user) => {
    const result = await User.newUser(user);
    return result;
  };

  module.exports = { newUser };