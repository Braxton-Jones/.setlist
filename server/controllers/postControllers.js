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
      }
    });
    return res.json(posts);
  } catch (err) {
    console.error(err)
    return res.json(err);
  }
};
  
  // Create Post
  exports.createPost = async (req, res) => {
    try{
      const result = await prisma.$transaction([
        // Check if tags used exist in database
        ...req.body.tags.map((tag) => prisma.tags.upsert({
          where: {spotifyId: tag.spotifyId, name: tag.name},
          update: {},
          create: tag
        })),

        // Create post with associated tags
        prisma.posts.create({
          data: {
            userId: parseInt(req.body.userId),
            username: req.body.username,
            title: req.body.title,
            body: req.body.body,
            tags: {
              connect: req.body.tags.map((tag) => ({spotifyId: tag.spotifyId}))
            }
          }
        })


      ])
      return res.json(result);
    }catch(err){
      console.error(err)
      return res.json(err);
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
          tags: req.body.tags,
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
          tags: {
            some: {
              name: {
                in: req.body.tags
              }
            }
          }
        },
        select: {
          id: true,
          userId: true,
          username: true,
          title: true,
          body: true,
          tags: true,
          Likes: true,
        }
      });
      return res.json(posts);
    } catch (err) {
      console.error(err)
      return res.json(err);
    }
  };


exports.deleteTags = async (req, res) => {
  try {
    await prisma.tags.deleteMany();
    return res.sendStatus(200);
  } catch (err) {
    console.error(err)
    return res.json(err);
  }
}
