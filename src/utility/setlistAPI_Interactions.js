import axios from 'axios';

export const createPlaylist = async (userId) => {
    // url = `http://localhost:3001/playlist/create/${userId}`;
}

export const getPlaylist = async (playlistId) => {
    // url = `http://localhost:3001/playlist/${playlistId}`;
}

export const deletePlaylist = async (playlistId) => {
    // url = `http://localhost:3001/playlist/${playlistId}`;
}

export const getAllPlaylists = async () => {
    // url = `http://localhost:3001/playlist/`;
    const url = `http://localhost:3001/playlist/`;
    try{
        const response = await axios.get(url);
        return response.data;
    }catch(error){
        console.error(error);
        throw error;
    }
}