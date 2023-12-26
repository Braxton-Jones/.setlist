const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

// Find User by username
exports.findUserByUsername = async (req, res) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          username: req.params.username,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User was not found or does not exist' });
      }
  
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  };
  
  // Get User's posts
  exports.getUserPosts = async (req, res) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          username: req.params.username,
        },
        include: {
          posts: true,
        },
      });
  
      return res.json(user.posts);
    } catch (err) {
      return res.status(500).json(err);
    }
  };
  
  // Create User
exports.createUser = async (req, res) => {
    try {
     const user = await prisma.users.create({
       data: {
         username: req.body.username,
         displayPhoto: req.body.displayPhoto,
         bio: req.body.bio,
         email: req.body.email,
         topArtists: req.body.topArtists,
       },
     });
   
     return res.status(201).json({ user, message: 'User created successfully' });
    } catch (err) {
     console.error(err)
     return res.status(500).json(err);
    }
   };
   
  
  // Update User
  exports.updateUser = async (req, res) => {
    try {
      await prisma.users.update({
        where: {
          username: req.params.username,
        },
        data: {
          username: req.body.username,
          displayPhoto: req.body.displayPhoto,
          bio: req.body.bio,
          email: req.body.email,
          topArtists: req.body.topArtists,
        },
      });
  
      return res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
      return res.status(500).json(err);
    }
  };
  
  // Delete User
  exports.deleteUser = async (req, res) => {
    try {
      await prisma.users.delete({
        where: {
          username: req.params.username,
        },
      });
  
      return res.json({ message: 'User deleted successfully' });
    } catch (err) {
      return res.json(err);
    }
  };

