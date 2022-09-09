const userService = require('../services/userService');

const createUser = async (req, res) => {
  const result = req.body;
  await userService.verifyToken(req.body.email);
  const token = await userService.createUser(result);
  return res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const result = await userService.getAllUsers();
  return res.status(200).json(result);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await userService.getUserById(id);
  if (!result) {
    return res.status(404).json({ message: 'User does not exist' });
  }
    return res.status(200).json(result);
};

const removeUser = async (req, res) => {
  const { userId } = req;
  const result = await userService.removeUser({ userId });
  if (!result) {
     return res.status(401).json({ message: 'Unauthorized user' });
  }
  return res.status(204).end();
};

module.exports = { createUser, getAllUsers, getUserById, removeUser };