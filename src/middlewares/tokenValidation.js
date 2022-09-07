require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const dataToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ where: { email: dataToken.email } });
    req.userId = user.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { tokenValidation };
