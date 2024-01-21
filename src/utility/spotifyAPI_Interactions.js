import { access_token } from './spotifyAPI_Auth'
import axios from 'axios'
export const getPlaylists = async () => {
  const token = await access_token
  const url = 'https://api.spotify.com/v1/me/playlists?limit=50'
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await axios.get(url, config)
    return response.data // return the data so it can be used elsewhere
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return getPlaylists()
    } else {
      console.error(error)
      throw error
    }
  }
}

export const getPlaylistDetails = async (playlistId) => {
  const token = await access_token
  const url = `https://api.spotify.com/v1/playlists/${playlistId}?fields=description%2Cimages%2Cname%2Cowner%28id%2Cdisplay_name%29%2Ctracks%28limit%2Cnext%2Coffset%2Cprevious%2Ctotal%2Citems%28added_at%2Ctrack%28name%2Cartists%28name%2Curi%2C%29album%28images%29%29%29%29`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await axios.get(url, config)
    return response.data // return the data so it can be used elsewhere
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return getPlaylistDetails(playlistId)
    } else {
      console.error(error)
      throw error
    }
  }
}

export const searchForArtists = async (searchTerm) => {
  const token = await access_token
  const url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist&limit=6`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await axios.get(url, config)
    return response.data // return the data so it can be used elsewhere
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return searchForArtists(searchTerm)
    } else {
      console.error(error)
      throw error
    }
  }
}
export const getUserInfo = async (userId) => {
  const token = await access_token
  const url = `https://api.spotify.com/v1/users/${userId}`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await axios.get(url, config)
    return response.data // return the data so it can be used elsewhere
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return getUserInfo(userId)
    } else {
      console.error(error)
      throw error
    }
  }
}

export const getPlaylistImage = async (playlistId) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/images`
  const token = await access_token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try{
    const response = await axios.get(url, config)
    return response.data
  }catch(error){
    if (error.response && error.response.status === 401) {
      return getPlaylistImage(playlistId)
    } else {
      console.error(error)
      throw error
    }
  }
}

export const followPlaylist = async (playlistId, userId, setBtnState) => {
  // Check if user is following playlist already
  setBtnState(false)
  const token = await access_token
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try{
    const response = await axios.get(url, config)
    if(response.data[0] === true){
      setBtnState(true)
      return
    }else{
      // Follow playlist
      const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      try{
        const response = await axios.put(url, {public: false}, config)
        setBtnState(true)
        return
      }catch(error){
       console.error(error)
      }
     
    }
}catch(error){
  console.error(error)
}
}

export const getArtistImages = async (artistIds) => {
  const token = await access_token
  const url = `https://api.spotify.com/v1/artists?ids=${artistIds}`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try{
    const response = await axios.get(url, config)
    return response.data
  }catch(error){
    console.error(error)
  }
}
