// JSX Fragments for the Tutorial page
import styles from '../styles/import.module.scss'
import { useState, Suspense, useMemo } from 'react'
import {
  getPlaylistDetails,
  getPlaylists,
} from '../utility/spotifyAPI_Interactions'
import { Await } from 'react-router-dom'
import Modal from './Modal'
import ArtistSelect from './ArtistSelect'
import arrow from '../assets/arrow.png'
import Loading from './Loading'
import { createPlaylist } from '../utility/setlistAPI_Interactions'
import toast, { Toaster } from 'react-hot-toast'

export const PlaylistSelect = ({
  setSelectedPlaylist,
  selectedPlaylist,
  setModalState,
  user,
}) => {
  const playlistPromsise = useMemo(() => getPlaylists(), [])

  return (
    <div className={styles.select}>
      <h1 className={styles.select_header}>Import</h1>
      <p className={styles.tooltip}>Select a playlist to start !</p>
      <p className={styles.tooltip_warning}>
        ✨ playlists must be added to profile to appear!
      </p>
      <div className={styles.playlist_selection}>
        <Suspense fallback={<Loading />}>
          <Await resolve={playlistPromsise}>
            {(data) => {
              const filteredPlaylists = data.items.filter(
                (playlist) => playlist.owner.id === user.id,
              )
              console.log(filteredPlaylists, 'filtered playlists')
              return (
                <div className={styles.playlist_wrapper}>
                  {filteredPlaylists.map((playlist) => {
                    console.log(playlist, 'playlist in playlist select')
                    return (
                      <div
                        className={`${styles.playlist} ${
                          selectedPlaylist.id === playlist.id
                            ? styles.selected_playlist
                            : ''
                        }`}
                        key={playlist.id}
                        onClick={() => {
                          setSelectedPlaylist({
                            id: playlist.id,
                            name: playlist.name,
                          })
                        }}
                        style={{
                          backgroundImage: `url(${playlist.images[0].url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      ></div>
                    )
                  })}
                </div>
              )
            }}
          </Await>
        </Suspense>
      </div>
      <button
        className={styles.import_btn}
        onClick={() => setModalState('step2')}
      >
        Import {selectedPlaylist.name ? selectedPlaylist.name : ''}
      </button>
    </div>
  )
}

export const PlaylistCreate = ({
  playlist,
  userPhoto,
  setModalState,
  user,
}) => {
  const { id, name } = playlist.selectedPlaylist
  const PlaylistDetailsPromise = useMemo(() => getPlaylistDetails(id), [id])
  const [selectedArtists, setSelectedArtists] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [playlistPurpose, setPlaylistPurpose] = useState('')
  const [isError, setIsError] = useState(false)
  const openModal = async () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handlePlaylistCreate = async () => {
    if (isError === true) {
      setIsError(false)
    }
    const cleanArtists = selectedArtists.map((artist) => {
      return {
        name: artist.name,
        id: artist.id,
        genres: artist.genres,
      }
    })
    const playlistGenres = selectedArtists
      .flatMap((artist) => artist.genres)
      .map((genre) => {
        return {
          name: genre,
        }
      })

    if (
      playlistPurpose === '' ||
      playlistPurpose === null ||
      playlistGenres.length === 0 ||
      cleanArtists.length === 0
    ) {
      setIsError(true)
      return
    }
    const newPlaylist = {
      name: name,
      spotifyPlaylistId: id,
      associatedGenres: playlistGenres,
      featuredArtists: cleanArtists,
      purpose: playlistPurpose,
    }
    const isImportSuccess = await createPlaylist(user.id, newPlaylist)
    if (isImportSuccess === 'Playlist already exists') {
      toast.error('Playlist already exists', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontFamily: 'Syne',
        },
      })
      return
    } else {
      toast.success('Playlist successfully imported', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontFamily: 'Syne',
        },
      })
      setModalState('step3')
    }
  }
  return (
    <>
      <Toaster />
      <div className={styles.create}>
        <h1 className={styles.create_header}>
          <img
            src={arrow}
            alt="arrow"
            className={styles.arrow}
            onClick={() => setModalState('step1')}
          />
          Create {name}
        </h1>
        <Suspense fallback={<Loading />}>
          <Await resolve={PlaylistDetailsPromise}>
            {(data) => {
              return (
                <>
                  <div className={styles.playlist_details}>
                    <div
                      className={styles.playlist_cover}
                      key={data.id}
                      style={{
                        backgroundImage: `url(${data.images[0].url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                    <div className={styles.playlist_info}>
                      <div className={styles.author_info}>
                        <img
                          src={userPhoto}
                          alt="profile picture"
                          className={styles.author_image}
                        />
                        <p className={styles.author_name}>
                          Created By: {data.owner.display_name}
                        </p>
                      </div>

                      <div className={styles.featured_artists}>
                        <h3>Featured Artists</h3>
                        <div className={styles.artists_select}>
                          <div
                            className={styles.new_artist_btn}
                            onClick={openModal}
                            disabled={isModalOpen}
                          >
                            +
                          </div>
                          {selectedArtists.map((artist) => {
                            return (
                              <img
                                src={artist.images[0].url}
                                className={styles.artist_image_mini}
                              />
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.error}>
                    {isError && (
                      <p className={styles.error_message}>
                        Please fill out all fields
                      </p>
                    )}
                  </div>
                  <div className={styles.playlist_description}>
                    <h3>Description</h3>
                    {data.description ? (
                      <p>{data.description.replace(/&quot;/g, ' " ')}</p>
                    ) : (
                      <p>No Description.....</p>
                    )}
                  </div>

                  <div className={styles.playlist_genres}>
                    <h3>Genres</h3>
                    <div className={styles.genres}>
                      {selectedArtists.flatMap((artist) => artist.genres)
                        .length === 0 ? (
                        <p className={styles.genre}>No genres</p>
                      ) : (
                        [
                          ...new Set(
                            selectedArtists.flatMap((artist) => artist.genres),
                          ),
                        ].map((genre, index) => (
                          <p key={index} className={styles.genre}>
                            {genre}
                          </p>
                        ))
                      )}
                    </div>
                  </div>

                  <div className={styles.playlist_purpose}>
                    <h3>What's it for?</h3>
                    <input
                      type="textarea"
                      placeholder="Enter a catchy little tagline"
                      maxLength="30"
                      onChange={(e) => setPlaylistPurpose(e.target.value)}
                    />
                  </div>

                  <div className={styles.playlist_tracks}>
                    <h3>Tracks</h3>
                    <div className={styles.tracks}>
                      {data.tracks.items.map((track) => {
                        return (
                          <div className={styles.track} key={track.track.id}>
                            <img
                              src={track.track.album.images[0].url}
                              alt="album cover"
                              className={styles.track_image}
                            />
                            <div className={styles.track_info}>
                              <p className={styles.track_name}>
                                {track.track.name}
                              </p>
                              <p className={styles.track_artist}>
                                {track.track.artists[0].name}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )
            }}
          </Await>
        </Suspense>
        <button
          className={isError ? styles.create_btn_error : styles.create_btn}
          onClick={() => handlePlaylistCreate()}
        >
          Create
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ArtistSelect
          setSelectedArtists={setSelectedArtists}
          selectedArtists={selectedArtists}
          closeModal={closeModal}
        />
      </Modal>
    </>
  )
}
