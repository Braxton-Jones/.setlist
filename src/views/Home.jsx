import styles from '../styles/homepage.module.scss'
import axios from 'axios'
import { useState } from 'react'
import { access_token } from '../utility/spotifyAPI_Auth'
import { useLoaderData, useNavigate } from 'react-router-dom'
import spotify from '../assets/iconmonstr-spotify-1-240.png'
import Modal from '../components/Modal'
import { PlaylistCreate, PlaylistSelect } from '../components/Import'
import { getPlaylists } from '../utility//spotifyAPI_Interactions'

export const homepageLoader = async () => {
  let token = await access_token
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
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized request')
      // Refresh the token and rerun the function
      token = await access_token
      return homepageLoader()
    } else {
      console.error(error)
      throw error
    }
  }
}

export default function HomePage() {
  const navigate = useNavigate()
  const user = useLoaderData()
  const screenSize = true

  const [query, setQuery] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    id: null,
    name: null,
  })

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
        {/* <PlaylistSelect
          screenSize={screenSize}
          setSelectedPlaylist={setSelectedPlaylist}
          selectedPlaylist={selectedPlaylist}
        /> */}
        <PlaylistCreate
          screenSize={screenSize}
          playlist={{
            id: '1Jiukn1VpWD4wldqfHAptz',
            name: 'rage',
          }}
          userPhoto={user.images[0].url}
        />
      </Modal>
    </section>
  )
}

// fields=id,description,images,name,owner(id,display_name),tracks(limit,next,offset,previous,total,items(added_at,track(album(images,id,name),artists,name,href)))
