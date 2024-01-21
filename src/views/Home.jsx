import styles from '../styles/homepage.module.scss'
import axios from 'axios'
import { Suspense, useState, useMemo } from 'react'
import { access_token, spotify_logout } from '../utility/spotifyAPI_Auth'
import { Await, useLoaderData, useNavigate } from 'react-router-dom'
import spotify from '../assets/iconmonstr-spotify-1-240.png'
import Modal from '../components/Modal'
import { PlaylistCreate, PlaylistSelect } from '../components/Import'
import PlaylistDetails from '../components/PlaylistDetails'
import {
  getAllPlaylists,
  searchForPlaylists,
} from '../utility/setlistAPI_Interactions'
import Loading from '../components/Loading'
import Playlist from '../components/Playlist'

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
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 401) {
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
  const [modalState, setModalState] = useState(closed)
  const [isImportSuccessful, setIsImportSuccessful] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    id: null,
    name: null,
  })
  const getAllPlaylistsPromise = useMemo(
    () => getAllPlaylists(),
    [query, isImportSuccessful],
  )
  const searchForPlaylistsPromise = useMemo(
    () => searchForPlaylists(query),
    [query],
  )
  const [isModalOpen, setModalOpen] = useState(false)
  const [isPlaylistDetailsOpen, setPlaylistDetailsOpen] = useState(false)
  const [selectedSetlist, setSelectedSetlist] = useState(null)

  const handleInputChange = (event) => {
    const newQuery = event.target.value
    setQuery(newQuery)
  }

  const openModal = async () => {
    setModalState('step1')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const openPlaylistDetails = () => {
    setPlaylistDetailsOpen(true)
  }

  const closePlaylistDetails = () => {
    setPlaylistDetailsOpen(false)
  }

  const resetSelectedPlaylist = () => {
    setSelectedPlaylist({
      id: null,
      name: null,
    })
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
          Import
          <img src={spotify} alt="spotify logo" className={styles.spotify} />
        </button>
        <div className={styles.profile}>
          <img
            src={user.images[0].url}
            alt="profile picture"
            className={styles.header_profile}
            // onClick={() => navigate('/profile')}
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
        <div className={styles.homepage__content__playlists}>
          <Suspense fallback={<Loading />}>
            <Await resolve={getAllPlaylistsPromise}>
              {(data) => {
                console.log(data, 'playlists')
                return (
                  <>
                    {query === null || query === '' ? (
                      data.map((playlist) => (
                        <Playlist
                          key={playlist.id}
                          playlist={playlist}
                          openPlaylistDetails={openPlaylistDetails}
                          setSelectedSetlist={setSelectedSetlist}
                        />
                      ))
                    ) : (
                      <Await resolve={searchForPlaylistsPromise}>
                        {(data) => {
                          console.log(data, 'search')
                          return (
                            <>
                              {data.map((playlist) => (
                                <Playlist
                                  key={playlist.id}
                                  playlist={playlist}
                                  openPlaylistDetails={openPlaylistDetails}
                                  setSelectedSetlist={setSelectedSetlist}
                                />
                              ))}
                            </>
                          )
                        }}
                      </Await>
                    )}
                  </>
                )
              }}
            </Await>
          </Suspense>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        resetState={resetSelectedPlaylist}
        modalState={modalState}
      >
        {modalState === 'step1' && (
          <PlaylistSelect
            setSelectedPlaylist={setSelectedPlaylist}
            selectedPlaylist={selectedPlaylist}
            setModalState={setModalState}
            user={user}
          />
        )}
        {modalState === 'step2' && (
          <PlaylistCreate
            playlist={{
              selectedPlaylist,
            }}
            userPhoto={user.images[0].url}
            setModalState={setModalState}
            user={user}
          />
        )}
        {modalState === 'step3' && (
          <div className={styles.success}>
            <h1>Success!</h1>
            <p>Playlist was successfully imported! </p>
            <button
              className={styles.success__button}
              onClick={() => {
                setModalState('closed')
                closeModal()
                setIsImportSuccessful(!isImportSuccessful)
              }}
            >
              Back to Home!
            </button>
          </div>
        )}
      </Modal>
      <Modal isOpen={isPlaylistDetailsOpen} onClose={closePlaylistDetails}>
        <PlaylistDetails selectedSetlist={selectedSetlist} />
      </Modal>
    </section>
  )
}
