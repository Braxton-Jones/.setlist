import React, { useState, Suspense, useMemo } from 'react'
import { searchForArtists } from '../utility/spotifyAPI_Interactions'
import styles from '../styles/artistselect.module.scss'
import { Await } from 'react-router-dom'
import Loading from './Loading'
import placeholder from '../assets/background.svg'

export default function ArtistSelect({
  selectedArtists,
  setSelectedArtists,
  closeModal,
}) {
  const [searchInput, setSearchInput] = useState('')
  const searchPromise = useMemo(
    () => searchForArtists(searchInput),
    [searchInput],
  )
  const [isArtistError, setIsArtistError] = useState(false)

  const handleInputChange = (event) => {
    setSearchInput(event.target.value)
  }

  const handleAddArtists = (artist) => {
    const { genres, id, name, images, external_urls } = artist
    const newArtists = {
      genres,
      id,
      name,
      images,
      external_urls,
    }

    // Don't forget to check if the artist is already in the array

    if (selectedArtists.length >= 8) {
      setIsArtistError(true)
      return
    }
    setSelectedArtists([...selectedArtists, newArtists])
  }
  const removeAddArtists = (artist) => {
    const newArtists = selectedArtists.filter((selectedArtist) => {
      return selectedArtist.id !== artist.id
    })
    setSelectedArtists(newArtists)
  }

  const handleModalClose = () => {
    setSearchInput('')
    closeModal()
  }

  return (
    <div className={styles.artist_select}>
      <h1>Search For Artists</h1>
      <div className={styles.error_wrapper}>
        {isArtistError && (
          <p className={styles.error}>
            You can only have 8 featured artists per playlist
          </p>
        )}
      </div>
      <div className={styles.input_wrapper}>
        <input
          type="text"
          placeholder="Search for an artist"
          value={searchInput}
          onChange={handleInputChange}
        />
        <button
          className={styles.addArtistsBtn}
          onClick={() => handleModalClose()}
          disabled={selectedArtists.length === 0}
        >
          Add {selectedArtists.length > 0 && selectedArtists.length} Artists
        </button>
      </div>

      <div className={styles.artists_select_view}>
        {selectedArtists.map((artist) => {
          return (
            <div
              className={styles.artist_mini}
              key={artist.id}
              onClick={() => removeAddArtists(artist)}
            >
              <img src={artist.images[0].url} alt={artist.name} />

              <p className={styles.title}>{artist.name}</p>
            </div>
          )
        })}
      </div>
      <div className={styles.artists_results}>
        {searchInput && (
          <Suspense fallback={<Loading />}>
            <Await resolve={searchPromise}>
              {(data) => {
                return (
                  <div className={styles.artists_wrapper}>
                    {data.artists.items.map((artist) => {
                      return (
                        <div
                          className={styles.artist}
                          key={artist.id}
                          onClick={() => handleAddArtists(artist)}
                        >
                          {artist.images[0] ? (
                            <img src={artist.images[0].url} alt={artist.name} />
                          ) : (
                            <img src={placeholder} alt={placeholder} />
                          )}

                          <div className={styles.artist_content}>
                            <p className={styles.title}>
                              Artist : {artist.name}
                            </p>
                            <div className={artist.genre}>
                              <p className={styles.title}>
                                Genres: [ {artist.genres.join(', ')} ]
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              }}
            </Await>
          </Suspense>
        )}
      </div>
    </div>
  )
}
