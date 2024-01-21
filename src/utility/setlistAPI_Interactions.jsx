import axios from 'axios'

export const createPlaylist = async (userId, playlist) => {
  const url = `http://localhost:3001/playlist/create/${userId}`
  const body = {
    name: playlist.name,
    spotifyPlaylistId: playlist.spotifyPlaylistId,
    associatedGenres: playlist.associatedGenres,
    featuredArtists: playlist.featuredArtists,
    purpose: playlist.purpose,
  }
  console.log(body, 'megan thee stallion')
  try {
    const response = await axios.post(url, body)
    return response.data.message
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getPlaylist = async (playlistId) => {
  // url = `http://localhost:3001/playlist/${playlistId}`;
}

export const deletePlaylist = async (playlistId) => {
  // url = `http://localhost:3001/playlist/${playlistId}`;
}

export const getAllPlaylists = async () => {
  // url = `http://localhost:3001/playlist/`;
  const url = `http://localhost:3001/playlist/`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const searchForPlaylists = async (query) => {
  const url = `http://localhost:3001/playlist/search/${query}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
