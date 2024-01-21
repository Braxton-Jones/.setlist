import axios from 'axios'
// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: 'spotify_access_token',
  refreshToken: 'spotify_refresh_token',
  expireTime: 'spotify_token_expire_time',
  timestamp: 'spotify_token_timestamp',
}

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}

export const spotify_logout = () => {
  // Clear all localStorage items
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property])
  }
  // Navigate to homepage
  window.location = '/'
}

const refreshToken = async () => {
  try {
    if (
      !LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
      Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
    ) {
      console.error('No refresh token available')
      logout()
    }

    const { data } = await axios.get(
      `http://localhost:3001/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`,
    )

    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      data.access_token,
    )
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now())
    window.location.reload()
  } catch (error) {
    console.error(error)
  }
}

const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES
  if (!accessToken || !timestamp) return false
  const millisecondsElapsed = Date.now() - Number(timestamp)
  return millisecondsElapsed / 1000 > Number(expireTime)
}

const getAccessToken = async () => {
  // Get the data from the search parameters, and set it to the localStorage
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
  }
  const hasError = urlParams.get('error')

  // Check if the token has expired
  if (hasTokenExpired()) {
    refreshToken()
  }

  // If there is a valid access token in localStorage, use that
  if (LOCALSTORAGE_VALUES.accessToken) {
    return LOCALSTORAGE_VALUES.accessToken
  }

  // If there is a token in the URL query params, user is logging in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property])
    }
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now())
    return queryParams[LOCALSTORAGE_KEYS.accessToken]
  }

  return false
}

export const access_token = getAccessToken()

