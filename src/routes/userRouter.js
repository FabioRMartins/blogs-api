const express = require('express');
const validation = require('../middlewares/userValidation');
const userController = require('../controllers/userController');
const { tokenValidation } = require('../middlewares/auth');

const router = express.Router();

router.post('/', validation, userController.createUser);
router.get('/', tokenValidation, userController.getAllUsers);

module.exports = router;