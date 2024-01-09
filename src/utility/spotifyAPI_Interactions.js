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
    console.error(error)
    throw error
  }
}
