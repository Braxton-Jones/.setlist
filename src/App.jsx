import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import LandingPage from './views/LandingPage'
import Layout from './Layout'
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>,
    ),
  )
  return <RouterProvider router={router} />
}

export default App
