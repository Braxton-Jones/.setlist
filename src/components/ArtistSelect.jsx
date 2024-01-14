import React, { useState, useEffect, Suspense } from 'react'
import { searchForArtists } from '../utility/spotifyAPI_Interactions'
import styles from '../styles/artistselect.module.scss'
import { Await } from 'react-router-dom'

export default function ArtistSelect({
  selectedArtists,
  setSelectedArtists,
  closeModal,
}) {
  const [searchInput, setSearchInput] = useState('')
  const searchPromise = searchForArtists(searchInput)

  const handleInputChange = (event) => {
    setSearchInput(event.target.value)
  }

  const handleAddArtists = (artist) => {
    console.log(artist)
    console.log(selectedArtists)
    const { genres, id, name, images, external_urls } = artist
    const newArtists = {
      genres,
      id,
      name,
      images,
      external_urls,
    }
    // if slected artists is ALREADY IN THE ARRAY, return

    
    if (selectedArtists.length >= 8) {
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
          <Suspense fallback={<p>Loading...</p>}>
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
                          <img src={artist.images[0].url} alt={artist.name} />
                          <div className={styles.artist_content}>
                            <p className={styles.title}>
                              Artist : {artist.name}
                            </p>
                            <div className={artist.genre}>
                              <p className={styles.title}>
                                Genres: [Hello, Goodlbye]
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
