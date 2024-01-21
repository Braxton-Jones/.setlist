import styles from '../styles/import.module.scss'
import {
  followPlaylist,
  getPlaylistDetails,
  getUserInfo,
  getArtistImages,
} from '../utility/spotifyAPI_Interactions'
import { Await } from 'react-router-dom'
import { Suspense, useMemo, useState } from 'react'
import Loading from './Loading'
export default function PlaylistDetails({ selectedSetlist }) {
  console.log(selectedSetlist)
  const { name, spotifyPlaylistId, purpose, featuredArtists, creator } =
    selectedSetlist
  const artistIds = featuredArtists
    .map((artist) => artist.spotifyArtistId)
    .flatMap((id) => id)
    .join(',')
  const ArtistImagePromsise = useMemo(
    () => getArtistImages(artistIds),
    [selectedSetlist],
  )
  const PlaylistDetailsPromise = useMemo(
    () => getPlaylistDetails(selectedSetlist.spotifyPlaylistId),
    [selectedSetlist],
  )
  const UserInfoPromise = useMemo(
    () => getUserInfo(selectedSetlist.creator[0].spotifyUserId),
    [selectedSetlist],
  )
  const [btnState, setBtnState] = useState(false)
  return (
    <div className={styles.create}>
      <h1 className={styles.create_header}>
        For {purpose}, {name}
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
                      <Await resolve={UserInfoPromise}>
                        {(user) => {
                          return (
                            <img
                              src={user.images[0].url}
                              alt="profile picture"
                              className={styles.author_image}
                            />
                          )
                        }}
                      </Await>
                      <p className={styles.author_name}>
                        Created By: {data.owner.display_name}
                      </p>
                    </div>

                    <div className={styles.featured_artists}>
                      <h3>Featured Artists</h3>
                      <div className={styles.artists_select}>
                        <Await resolve={ArtistImagePromsise}>
                          {(images) => {
                            const artistURLs = images.artists.map(
                              (artist) => artist.images[0].url,
                            )
                            return (
                              <>
                                {artistURLs.map((url) => (
                                  <img
                                    src={url}
                                    className={styles.artist_image_mini}
                                  />
                                ))}
                              </>
                            )
                          }}
                        </Await>
                        {/* {featuredArtists.map((artist) => {
                            return (
                              <img
                                src={artist.images[0].url}
                                className={styles.artist_image_mini}
                              />
                            )
                          })} */}
                      </div>
                    </div>
                  </div>
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
                    {featuredArtists.flatMap((artist) => artist.genres)
                      .length === 0 ? (
                      <p className={styles.genre}>No genres</p>
                    ) : (
                      [
                        ...new Set(
                          featuredArtists.flatMap((artist) => artist.genres),
                        ),
                      ].map((genre, index) => (
                        <p key={index} className={styles.genre}>
                          {genre}
                        </p>
                      ))
                    )}
                  </div>
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
                <button
                  className={styles.create_btn}
                  onClick={() =>
                    followPlaylist(
                      spotifyPlaylistId,
                      creator[0].spotifyUserId,
                      setBtnState,
                    )
                  }
                >
                  {btnState ? 'Saved' : 'Save'}
                </button>
              </>
            )
          }}
        </Await>
      </Suspense>
    </div>
  )
}
