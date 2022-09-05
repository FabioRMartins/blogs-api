const { createToken } = require('../helpers/token');
const userService = require('../services/userService');

const newUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const token = createToken({ email, password });
    await userService.newUser({ displayName, email, password, image });
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { newUser };