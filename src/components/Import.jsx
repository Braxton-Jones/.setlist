// JSX Fragments for the Tutorial page
import styles from '../styles/tutorial.module.scss'
import { useState, Suspense } from 'react'
import {
  getPlaylistDetails,
  getPlaylists,
} from '../utility/spotifyAPI_Interactions'
import { Await } from 'react-router-dom'
import Modal from './Modal'
import ArtistSelect from './ArtistSelect'
export const PlaylistSelect = ({
  screenSize,
  setSelectedPlaylist,
  selectedPlaylist,
}) => {
  const playlistPromsise = getPlaylists()

  return (
    <div className={styles.select}>
      <h1 className={styles.select_header}>
        {screenSize ? 'Import' : 'Import New Playlist'}
      </h1>
      <p className={styles.tooltip}>Select a playlist to start !</p>
      <p className={styles.tooltip_warning}>
        ✨ playlists must be added to profile to appear!
      </p>
      <div className={styles.playlist_selection}>
        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={playlistPromsise}>
            {(data) => {
              console.log(data, 'data object')
              return (
                <div className={styles.playlist_wrapper}>
                  {data.items.map((playlist) => {
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
                          minHeight: '100px',
                          minWidth: '100px',
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
      <button className={styles.import_btn}>
        Import {selectedPlaylist.name ? selectedPlaylist.name : ''}
      </button>
    </div>
  )
}

export const PlaylistCreate = ({ screenSize, playlist, userPhoto }) => {
  const PlaylistDetailsPromise = getPlaylistDetails(playlist.id)
  const [selectedArtists, setSelectedArtists] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = async () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }
  return (
    <>
      <div className={styles.create}>
        <h1 className={styles.create_header}>
          {screenSize ? 'Create' : 'Create New .setlist()'}
        </h1>
        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={PlaylistDetailsPromise}>
            {(data) => {
              console.log(data, 'data details')
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
                            console.log(artist, 'artist')
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
                  <div className={styles.playlist_description}>
                    <h3>Description</h3>
                    <p>{data.description.replace(/&quot;/g, ' " ')}</p>
                  </div>

                  <div className={styles.playlist_genres}>
                    <h3>Genres</h3>
                    <div className={styles.genres}>
                      {[
                        ...new Set(
                          selectedArtists.flatMap((artist) => artist.genres),
                        ),
                      ].map((genre, index) => (
                        <p key={index} className={styles.genre}>
                          {genre}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className={styles.playlist_purpose}>
                    <h3>What's it for?</h3>
                    <input
                      type="textarea"
                      placeholder="Enter a catchy little tagline"
                      maxLength="30"
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
        <button className={styles.create_btn}>Create</button>
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

// description,images,name,owner(id,display_name),tracks(limit,next,offset,previous,total,items(added_at,track(album(images),id,name,artists)))
