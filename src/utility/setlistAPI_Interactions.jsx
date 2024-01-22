import axios from 'axios'

export const createPlaylist = async (userId, playlist) => {
  const url = `https://setlistapi.onrender.com/playlist/create/${userId}`
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


export const getAllPlaylists = async () => {
  // url = `http://localhost:3001/playlist/`;
  const url = `https://setlistapi.onrender.com/playlist/`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const searchForPlaylists = async (query) => {
  const url = `https://setlistapi.onrender.com/playlist/search/${query}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
