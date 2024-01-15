import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  useLoaderData,
  useNavigate,
} from 'react-router-dom'
import { access_token } from '../utility/spotifyAPI_Auth'
import HomePage, { homepageLoader } from '../views/Home'
import Profile from '../views/Profile'
import Error404 from '../views/Error404'

function Layout() {
  return (
    <main>
      <Outlet />
    </main>
  )
}

const routes = createRoutesFromElements([
  <Route path="/" element={<Layout />}>
    <Route
      path="/"
      element={<HomePage />}
      loader={homepageLoader}
      errorElement={<Error404 />}
    />
    <Route path="profile" element={<Profile />} errorElement={<Error404 />} />
    <Route path="*" element={<Error404 />} />
  </Route>,
])

const router = createBrowserRouter(routes)

export default function SetlistApp() {
  return <RouterProvider router={router} />
}
