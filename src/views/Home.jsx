import styles from '../styles/homepage.module.scss'
import axios from 'axios'
import { useState } from 'react'
import { access_token } from '../utility/spotifyAPI_Auth'
import { useLoaderData, useNavigate } from 'react-router-dom'
import spotify from '../assets/iconmonstr-spotify-1-240.png'
import Modal from '../components/Modal'
import { PlaylistCreate, PlaylistSelect } from '../components/Tutorial'
import { getPlaylists } from '../utility//spotifyAPI_Interactions'

export const homepageLoader = async () => {
  const token = await access_token
  const url = 'https://api.spotify.com/v1/me'
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

export default function HomePage() {
  const navigate = useNavigate()
  const user = useLoaderData()
  const screenSize = true

  const [query, setQuery] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [currentUsersPlaylists, setCurrentUsersPlaylists] = useState(null)

  const handleInputChange = (event) => {
    const newQuery = event.target.value
    setQuery(newQuery)
  }

  const openModal = async () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <section className={styles.homepage}>
      <h1 className={styles.logo}>SETLIST</h1>
      <header>
        <h1>Home</h1>
        <button
          className={styles.importbtn}
          onClick={openModal}
          disabled={isModalOpen}
        >
          {screenSize ? 'Import' : 'Import Playlist'}
          <img src={spotify} alt="spotify logo" className={styles.spotify} />
        </button>
        <div className={styles.profile}>
          <img
            src={user.images[0].url}
            alt="profile picture"
            className={styles.header_profile}
            onClick={() => navigate('/profile')}
          />
        </div>
      </header>

      <div className={styles.homepage__filters}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          className={styles.searchBar}
        />
      </div>

      <section className={styles.homepage__content}>
        <h2>Playlists</h2>
        <div className={styles.homepage__content__filters}></div>
        <div className={styles.homepage__content__playlists}></div>
      </section>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* {PlaylistCreate} */}
        {
          <PlaylistSelect
            screenSize={screenSize}
          />
        }
      </Modal>
    </section>
  )
}

{
  /* <button onClick={() => navigate('/profile')}>Go to Profile</button>
<button onClick={() => navigate('/search')}>Go to Search</button> */
}

// <img src={user.images[1].url} alt="profile picture"/>
