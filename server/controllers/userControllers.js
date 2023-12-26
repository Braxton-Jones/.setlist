const User = require('../models/User.js');

// Find User by username
exports.findUserByUsername = (req, res) => {
    User.findOne({
        where: {
            username: req.params.username
        }
    })
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res.json(err);
    });
};


// Get User's posts

// Get User's Spotify Data (could be split into multiple functions)

// Create User

// Update User

// Delete User

