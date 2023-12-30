const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

// Get All Comments for a specific post
exports.getComments = async (req,res) => {
  try{
    const comments = await prisma.comments.findMany({
      where: {
        postId: parseInt(req.params.postid)
      },
      include: {
        replies  : {
          include: {
            replies  : true,
            Likes: true
          }
        },
        Likes: true
      }
    })
    return res.json(comments);


  }catch(err){
    console.error(err)
    return res.json(err);
}}
// Add Comment
exports.addComment = async (req, res) => {
    try {
      const comment = await prisma.comments.create({
        data: {
          username: req.body.username,
          body: req.body.body,
          userId: parseInt(req.params.userid),
          postId: parseInt(req.params.postid),
          commentId: parseInt(req.params.commentid),
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
      // need to delete all replies to comment first
      
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

// Add Reply to Comment
exports.addReply = async (req,res) => {}

  // Delete Reply to Comment
exports.deleteReply = async (req,res) => {}


