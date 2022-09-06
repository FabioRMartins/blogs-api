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

const getUserById = async (res, req) => {
  const { id } = req.params;
  const result = await userService.getUserById(id);
  if (!result) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  return res.status(200).json(result);
};

module.exports = { createUser, getAllUsers, getUserById };