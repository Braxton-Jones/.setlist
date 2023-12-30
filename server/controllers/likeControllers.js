const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Like a Post
exports.likePost = async (req, res) => {
  // check if user already liked post
  const hasUserliked = await prisma.likes.findMany({
    where: {
      username: req.params.username,
      postId: parseInt(req.params.postid),
    },
  });
  if(hasUserliked.length > 0){
    return res.json({message: 'User already liked post'})
  }
    try {
      const like = await prisma.likes.create({
        data: {
          username: req.params.username,
          postId: parseInt(req.params.postid),
        },
      });
      res.json(like);
    } catch (err) {
      console.error(err)
      res.json(err);
    }
  };
  
  // Unlike a Post
  exports.unlikePost = async (req, res) => {
    try {
      const like = await prisma.likes.deleteMany({
        where: {
          username: req.params.username,
          postId: parseInt(req.params.postid),
        },
      });
      res.json(like);
    } catch (err) {
      console.error(err)
      res.json(err);
    }
  };

  // Like a Comment
exports.likeComment = async (req, res) => {
  try {

    // check if user already liked comment
    const hasUserliked = await prisma.likes.findMany({
      where: {
        username: req.params.username,
        commentId: parseInt(req.params.commentid),
      },
    });
    if(hasUserliked.length > 0){
      return res.json({message: 'User already liked comment'})
    }
    const like = await prisma.likes.create({
      data: {
        username: req.params.username,
        commentId: parseInt(req.params.commentid),
      },
    });
    res.json(like);
  } catch (err) {
    console.error(err)
    res.json(err);
  }
};

// Unlike a Comment
exports.unlikeComment = async (req, res) => {
  try {
    const like = await prisma.likes.deleteMany({
      where: {
        username: req.params.username,
        commentId: parseInt(req.params.commentid),
      },
    });
    res.json(like);
  } catch (err) {
    console.error(err)
    res.json(err);
  }
};