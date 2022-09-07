require('dotenv').config();
const jwt = require('jsonwebtoken');
const { emailValidation } = require('../services/userService');

const { JWT_SECRET } = process.env;
const jwtConfig = { algorithm: 'HS256', expiresIn: '1d' };

const loginValidation = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  return true;
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!loginValidation(req, res)) {
    return null;
  }
  const userValidation = await emailValidation(email, password);
  if (!userValidation) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = { login };
