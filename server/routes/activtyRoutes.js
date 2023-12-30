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



/* -------------------------
Routes for Commenting Posts
------------------------- */

// Get all comments for a post
router.get('/posts/:postid/comments', commentControllers.getComments);

// Add comment to post
router.post('/posts/:userid/:postid', commentControllers.addComment);

// Delete comment or nested reply from post
router.delete('/posts/comments/:commentid', commentControllers.deleteComment);

// Add reply to comment
router.post('/posts/comments/:userid/:commentid', commentControllers.addComment);


/* --------------------------------
Routes for Liking Posts & Comments
--------------------------------- */
// Like a post
router.post('/posts/:username/likes/:postid', likeControllers.likePost);

// Unlike a post
router.delete('/posts/:username/likes/:postid', likeControllers.unlikePost);

// Like a comment
router.post('/posts/:username/comments/likes/:commentid', likeControllers.likeComment);

// Unlike a comment
router.delete('/posts/:username/comments/likes/:commentid', likeControllers.unlikeComment);












// Delete Tags (Not in use. for development purposes only)
// router.delete('/tags', async (req, res) => {
//   try {
//     await prisma.tags.deleteMany();
//     return res.sendStatus(200);
//   } catch (err) {
//     console.error(err)
//     return res.json(err);
//   }
// });

module.exports = router;