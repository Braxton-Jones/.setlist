const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postControllers.js');
const commentControllers = require('../controllers/commentControllers.js');
const likeControllers = require('../controllers/likeControllers.js');

/* ---------- 
Post Routes
-----------*/

// Get recent posts that are relevant to the user
router.get('/posts/orbit', postControllers.getRelevantPosts)

// Get all posts
router.get('/posts', postControllers.getAllPosts);

// Create Post
router.post('/posts', postControllers.createPost);

// Update Post
router.put('/posts/:id', postControllers.updatePost);

// Delete Post
router.delete('/posts/:id', postControllers.deletePost);

/* ----------
Routes for Commenting and Liking Posts
---------- */

// Add comment to post
router.post('/posts/:postid/comments', commentControllers.addComment);

// Remove comment from post
router.delete('/posts/:postid/comments/:commentid', commentControllers.deleteComment);

// Add comment to comment
router.post('/posts/:postid/comments/:commentid', commentControllers.addComment);


// Like a post
router.post('/posts/:postid/likes', likeControllers.likePost);
// Unlike a post
router.delete('/posts/:postid/likes', likeControllers.unlikePost);

module.exports = router;