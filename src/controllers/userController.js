const userService = require('../services/userService');

const createUser = async (req, res) => {
  const token = await userService.createUser(req.body);

  if (!token) {
    return res.status(500).json({ message: 'Invalid fields' });
  }

  return res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const result = await userService.getAllUsers();
  
  return res.status(200).json(result);
};

module.exports = { createUser, getAllUsers };