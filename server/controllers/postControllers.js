const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.posts.findMany({
      select: {
        id: true,
        userId: true,
        username: true,
        title: true,
        body: true,
        tags: true,
        Likes: true,
        Comments: true,
      }
    });
    return res.json(posts);
  } catch (err) {
    console.error(err)
    return res.json(err);
  }
};

// Get Post's comments
exports.getPostComments = async (req, res) => {
    try {
      const post = await prisma.posts.findUnique({
        where: {
          body: req.params.body,
        },
        include: {
          commentsList: true,
        },
      });
      return res.json(post.commentsList);
    } catch (err) {
      return res.json(err);
    }
  };
  
  // Create Post
  exports.createPost = async (req, res) => {
    try {
      const post = await prisma.posts.create({
        data: {
          username: req.body.username,
          body: req.body.body,
          title: req.body.title,
          userId: req.body.userId,
          tags: typeof req.body.tags === 'string' ? [req.body.tags] : req.body.tags,
          audioTag: req.body.audioTag || 'none',
          mediaLink: req.body.mediaLink || 'none'
        },
      });
      return res.status(200).json({ post, message: 'Post created successfully' });
    } catch (err) {
        console.error(err)
      return res.status(500).json(err);
    }
   };
   
  
  // Update Post
  exports.updatePost = async (req, res) => {
    try {
      await prisma.posts.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          username: req.body.username,
          body: req.body.body,
          likes: req.body.likes,
          comments: req.body.comments,
        },
      });
      return res.sendStatus(200);
    } catch (err) {
      console.error(err)
      return res.json(err);
    }
  };
  
  // Delete Post
  exports.deletePost = async (req, res) => {
    try {
      await prisma.posts.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      return res.sendStatus(200);
    } catch (err) {
      console.error(err)
      return res.json(err);
    }
  };
  
  // Get Relevant Posts (search by tags)
  exports.getRelevantPosts = async (req, res) => {
    try {
      const posts = await prisma.posts.findMany({
        where: {
          tags: req.params.tags,
        },
      });
      return res.json(posts);
    } catch (err) {
      return res.json(err);
    }
  };
