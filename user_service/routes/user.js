const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.get('/', userController.getUsers);

module.exports = router;