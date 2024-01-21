import { useState, useEffect } from 'react'
import { getPlaylistImage } from '../utility/spotifyAPI_Interactions'
import styles from '../styles/playlist.module.scss'

export default function Playlist({
  playlist,
  openPlaylistDetails,
  setSelectedSetlist,
}) {
  const { name, spotifyPlaylistId, purpose, featuredArtists, creator } =
    playlist
  const [playlistImage, setPlaylistImage] = useState(null)

  useEffect(() => {
    getPlaylistImage(spotifyPlaylistId).then((image) => {
      setPlaylistImage(image[0].url)
    })
  }, [spotifyPlaylistId])

  const handlePlaylistClick = () => {
    setSelectedSetlist(playlist)
    openPlaylistDetails()
  }

  return (
    <div className={styles.playlist} onClick={handlePlaylistClick}>
      <div>
        {playlistImage && (
          <img
            src={playlistImage}
            alt="playlist image"
            className={styles.playlist_image}
          />
        )}
      </div>
      <div className={styles.playlist_info}>
        <div className={styles.playlist_purpose}>
          .setlist made for {purpose}...
        </div>
        <div className={styles.playlist_name}>
          {name} <span>by</span> {creator[0].name}
        </div>
        <div className={styles.playlist_featured_artists}>
          <span>Featured Artists:</span>{' '}
          <div className={styles.playlist_featured_artists__divider}>
            {featuredArtists.map((artist) => {
              return <span className={styles.artist}>{artist.name} </span>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
