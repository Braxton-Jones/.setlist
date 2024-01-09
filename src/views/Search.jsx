import { useNavigate } from 'react-router-dom'
export default function Search() {
  let navigate = useNavigate()
  return (
    <div>
      <h1>Search</h1>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  )
}
