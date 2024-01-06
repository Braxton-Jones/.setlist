const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

// Create a new playlist(Add a playlist to profile)
exports.createPlaylist = async (req, res) => {
    const { 
        name, 
        photoURL, 
        spotifyPlaylistId, 
        spotifyPlaylistURI, 
        associatedGenres, 
        associatedArtists, 
        purpose } = req.body;


    try {
        const playlist = await prisma.playlists.create({
        data: {
            name,
            photoURL,
            spotifyPlaylistId,
            spotifyPlaylistURI,
            associatedGenres,
            associatedArtists,
            purpose,
            users: {
                connect: {
                    id: parseInt(req.params.userid),
                },
            },
            
        }
        });
    
        res.status(201).json(playlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    finally {
        await prisma.$disconnect();
      }

}

// Get a single playlist by id
exports.getPlaylistById = async (req, res) => {
    try {
        const playlist = await prisma.playlists.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            select:{
                id: true,
                name: true,
                photoURL: true,
                spotifyPlaylistId: true,
                spotifyPlaylistURI: true,
                associatedGenres: true,
                associatedArtists: true,
                purpose: true,
                users: {
                    select: {
                        id: true,
                        name: true,
                        photoURL: true,
                        spotifyUserId: true
                    }
                
                },
            }
        });
        res.status(200).json(playlist);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
      }
}

// Delete a playlist from users profile
exports.deletePlaylist = async (req, res) => {
    try {
        const playlist = await prisma.playlists.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.status(200).json(playlist, { message: "Playlist deleted" });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
      }
}

module.exports = exports;