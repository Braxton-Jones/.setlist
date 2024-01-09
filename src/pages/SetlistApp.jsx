import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  useLoaderData,
  useNavigate,
} from 'react-router-dom'
import { access_token, spotify_logout } from '../utility/spotifyAPI_Auth'
import HomePage, { homepageLoader } from '../views/Home'
import Profile from '../views/Profile'
import Search from '../views/Search'
import { isUserOnboarded } from '../utility/userTutorial'
import styles from '../styles/layout.module.scss'
import sillyEmojiGuy from '../assets/thinking-face_1f914.png'

function Layout() {
  const loaderResult = useLoaderData()
  const navigate = useNavigate()
  console.log(loaderResult.data)
  return (
    <main>
      {/* {!loaderResult.data.isOnboarded && (
        <section className={styles.tutorial}>
          <h2>First Time? <img src={sillyEmojiGuy} style={{ width: '35px', height: '35px' }} /></h2>
          <p>
            Setlist is a tool for Spotify users to create and share playlists
            with their friends. By signing in, you've already created an account
            with us, so now, you can share playlists with your friends!
          </p>
          <button onClick={() => navigate('profile')}>
            Share your first Playlist
          </button>
        </section>
      )} */}
      <Outlet />
    </main>
  )
}

const routes = createRoutesFromElements([
  <Route
    path="/"
    element={<Layout />}
    loader={() => isUserOnboarded(access_token)}
  >
    <Route path="/" element={<HomePage />} loader={homepageLoader} />
    <Route path="profile" element={<Profile />} />
    <Route path="search" element={<Search />} />
    <Route path="*" element={<h1>Not Found</h1>} />
    <Route path="error" element={<h1>Something went wrong</h1>} />
  </Route>,
])

const router = createBrowserRouter(routes)

export default function SetlistApp() {
  return <RouterProvider router={router} />
}
