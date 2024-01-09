import axios from 'axios'

export const isUserOnboarded = async (token) => {
  const accessToken = await token
  const url = 'https://api.spotify.com/v1/me'
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  try {
    // Get user data from Spotify API
    const response = await axios.get(url, config)
    const { display_name, id, email } = response.data
    console.log(id)

    // Check if user is in database (returns null if user does not exist)
    const doesUserExist = await axios.get(
      `http://localhost:3001/user/onboarding/${id}`,
    )

    // If user does not exist, add user to database
    if (doesUserExist.data === null) {
      try {
        await axios.post('http://localhost:3001/user/', {
          email: email,
          name: display_name,
          spotifyUserId: id,
        })
        return false // user is not onboarded just yet
      } catch (error) {
        console.error(error)
        throw error
      }
    } else {
      // User exists in database, so they've already onboarded
      const user = axios.get(`http://localhost:3001/user/${id}`)
      return user
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const onboardUser = async (token) => {}
