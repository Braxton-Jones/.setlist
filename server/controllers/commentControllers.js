const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

// Add Comment
exports.addComment = async (req, res) => {
    try {
      const comment = await prisma.comment.create({
        data: {
          username: req.body.username,
          body: req.body.body,
        },
      });
      return res.json(comment);
    } catch (err) {
      return res.json(err);
    }
  };
  
  // Update Comment
  exports.updateComment = async (req, res) => {
    try {
      await prisma.comment.update({
        where: {
          body: req.params.body,
        },
        data: {
          username: req.body.username,
          body: req.body.body,
        },
      });
      return res.sendStatus(200);
    } catch (err) {
      return res.json(err);
    }
  };
  
  // Delete Comment
  exports.deleteComment = async (req, res) => {
    try {
      const comment = await prisma.comment.delete({
        where: {
          body: req.params.body,
        },
      });
      return res.json(comment);
    } catch (err) {
      return res.json(err);
    }
  };