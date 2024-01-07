import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  useLoaderData,
  useNavigate
} from 'react-router-dom'
import { access_token, spotify_logout } from '../spotifyAuth'
import HomePage, {homepageLoader}from '../AppRoutes/HomePage'
import Profile from '../AppRoutes/Profile'
import Search from '../AppRoutes/Search'
import { isUserOnboarded } from '../Utility/userOnboarding'

function Layout() {
  const loaderResult = useLoaderData()
  const navigate = useNavigate()
  console.log(loaderResult.data)
  return (
    <main>
     {!loaderResult.data.isOnboarded && 
     <section>
        <h2>How it Works</h2>
        <p>Setlist is a tool for Spotify users to create and share playlists with their friends.</p>
        <p>By signing in, you've already created an account with us</p>
        <p>so now, you can share playlists with your friends!</p>
        <button onClick={() => navigate('profile')}>Share my first Playlist!</button>
    </section>}
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
  </Route>,
])

const router = createBrowserRouter(routes)

export default function SetlistApp() {
  return <RouterProvider router={router} />
}
