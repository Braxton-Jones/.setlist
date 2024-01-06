const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.js');

// Create a new User (from the onboarding process)
router.post('/', userController.createUser);

// Get a User by their ID
router.get('/:id', userController.getUserById);

// Delete a User by their ID
router.delete('/:id', userController.deleteUserById);


module.exports = router;
