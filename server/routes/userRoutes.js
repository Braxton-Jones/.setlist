const express = require('express');
const userControllers = require('../controllers/userControllers.js');
const router = express.Router();

/* ----------
 User Routes
---------- */

// Find User by username
router.get('/user/:username', userControllers.findUserByUsername);

// Get User's posts
router.get('/user/:username/posts', userControllers.getUserPosts);

// Create User
router.post('/user', userControllers.createUser);

// Update User
router.put('/user/:username', userControllers.updateUser);

// Delete User
router.delete('/user/:username', userControllers.deleteUser);

module.exports = router;