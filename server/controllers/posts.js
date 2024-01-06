const { PrismaClient } = require('@prisma/client');
const { Model } = require('sequelize');

const prisma = new PrismaClient()

// Create a new playlist post
exports.createPost = async (req, res) => {
    const {content} = req.body;

    try {
        const post = await prisma.posts.create({
            data: {
                content,
                authorId: parseInt(req.params.userid),
                playlistId: parseInt(req.params.playlistid),
            }
        });
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    finally {
        await prisma.$disconnect();
      }

}

// Get all Posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.posts.findMany();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    finally {
        await prisma.$disconnect();
      }
}

// Get a single Post by id
exports.getPostById = async (req, res) => {
    try {
        const post = await prisma.posts.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
           include: {
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                photoURL: true,
                            }
                        },
                        nestedComments: {
                            include: {
                                author: {
                                    select: {
                                        id: true,
                                        name: true,
                                        photoURL: true,
                                    }
                                },
                            }
                        },
                    }
                }
           }
        });
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
    finally {
        await prisma.$disconnect();
      }
}

// Delete a Post by id
exports.deletePostById = async (req, res) => {
    try {
        // Check if post exists if not throw error
        const post = await prisma.posts.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.status(200).json({post,  message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
    finally {
        await prisma.$disconnect();
      }
}

module.exports = exports;
