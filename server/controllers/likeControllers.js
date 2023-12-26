const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Like a Post or Comment
exports.likePost = async (req, res) => {
    try {
      const like = await prisma.likes.create({
        data: {
          username: req.body.username,
          postId: req.body.postId,
          commentId: req.body.commentId,
        },
      });
      res.json(like);
    } catch (err) {
      console.error(err)
      res.json(err);
    }
  };
  
  // Unlike a Post or Comment
  exports.unlikePost = async (req, res) => {
    try {
      const like = await prisma.likes.deleteMany({
        where: {
          postId: parseInt(req.body.postId),
         commentId: parseInt(req.body.commentId),
        },
      });
      res.json(like);
    } catch (err) {
      console.error(err)
      res.json(err);
    }
  };