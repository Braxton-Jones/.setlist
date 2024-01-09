import LandingPage from './pages/LandingPage'
import SetlistApp from './pages/SetlistApp'
import { useEffect, useState } from 'react'

export default function App() {
  const [isAccessToken, setAccessToken] = useState(null)

  useEffect(() => {
    if (window.localStorage.getItem('spotify_access_token')) {
      setAccessToken(true)
    } else {
      setAccessToken(false)
    }
  }, [])

  return <div>{isAccessToken ? <SetlistApp /> : <LandingPage />}</div>
}
