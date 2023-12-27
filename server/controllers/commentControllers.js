const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

// Add Comment
exports.addComment = async (req, res) => {
    try {
      const comment = await prisma.comments.create({
        data: {
          username: req.body.username,
          body: req.body.body,
          userId: parseInt(req.body.userId),
          postId: parseInt(req.body.postId),
          commentId: parseInt(req.body.commentId),
        },
      });
      return res.json(comment);
    } catch (err) {
      console.error(err)
      return res.json(err);
    }
  };
    
  // Delete Comment
  exports.deleteComment = async (req, res) => {
    try{
      await prisma.comments.delete({
        where: {
          id: parseInt(req.params.commentid),
        },
      });
      return res.json({ message: 'Comment deleted successfully' });
      }catch(err){
        console.error(err)
        return res.json(err);
    }
  
  };

