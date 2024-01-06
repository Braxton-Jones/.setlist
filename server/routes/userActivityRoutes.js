const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments');
const postsController = require('../controllers/posts');


// Create a new Post
router.post('/create/:userid/:playlistid', postsController.createPost);

// Get all Posts
router.get('/timeline', postsController.getAllPosts);

// Get a Post by its ID
router.get('/post/:id', postsController.getPostById);

// Delete a Post
router.delete('/post/:id', postsController.deletePostById);

{/*----------------------*/}

// Create a new Comment on a Post
router.post('/:userid/post/:postid/comment', commentController.createComment);

// Edit a Comment
router.put('/editcommement/:commentid', commentController.editComment);

// Delete a Comment
router.delete('/deletecomment/:commentid', commentController.deleteCommentorNestedComment);

// Comment on a Comment
router.post('/:userid/:commentid/comment', commentController.createNestedComment);






module.exports = router;
