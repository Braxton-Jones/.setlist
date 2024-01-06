const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

// Comment on a Post
exports.createComment = async (req, res) => {
    const { content, authorId, postId } = req.body;

    try {
        const comment = await prisma.comments.create({
            data: {
                content,
                authorId : parseInt(req.params.userid),
                postId: parseInt(req.params.postid),
            }
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    finally {
        await prisma.$disconnect();
      }
}

// Edit a Comment
exports.editComment = async (req, res) => {
    const { content } = req.body;

    try {
        const comment = await prisma.comments.update({
            where: {
                id: parseInt(req.params.commentid),
            },
            data: {
                content
            }
        });
        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
      }
}

// Delete a Comment
exports.deleteCommentorNestedComment = async (req, res) => {
 }
 
 // Comment on a Comment
 exports.createNestedComment = async (req, res) => {
        const { content} = req.body;
    
        try {
            const comment = await prisma.nestedComments.create({
                data: {
                    content,
                    comment: {
                        connect: {
                            id: parseInt(req.params.commentid),
                        },
                    },
                    author: {
                        connect: {
                            id: parseInt(req.params.userid),
                        },
                    }
                }
            });
    
            res.status(201).json(comment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
        finally {
            await prisma.$disconnect();
        }
 }