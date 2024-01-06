const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()



// Create a new User (from the onboarding process)
exports.createUser = async (req, res) => {
  const {
    email,
    name,
    spotifyUserId,
    spotifyUserURI,
    photoURL,
    isOnboarded,
    associatedGenres,
    followedArtists, 
  } = req.body;
  try {
    const user = await prisma.users.create({
      data: {
        email,
        name,
        spotifyUserId,
        spotifyUserURI,
        photoURL,
        isOnboarded,
        associatedGenres,
        followedArtists
    
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

// Get a User by their ID
exports.getUserById = async (req, res) => {

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      select:{
        id: true,
        email: true,
        name: true,
        spotifyUserId: true,
        spotifyUserURI: true,
        photoURL: true,
        isOnboarded: true,
        associatedGenres: true,
        followedArtists: true,
        playlists: true,
        posts: true,
      }
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

// Delete a User by their ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await prisma.users.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};



module.exports = exports;
