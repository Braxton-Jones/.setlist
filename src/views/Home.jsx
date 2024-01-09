import { useNavigate } from 'react-router-dom'
import styles from '../styles/homepage.module.scss'
import axios from 'axios'
import { access_token } from '../utility/spotifyAuth'
import { useLoaderData } from 'react-router-dom'
import spotify from '../assets/iconmonstr-spotify-1-240.png'
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

import React, { useState } from 'react'

export default function HomePage() {
  let navigate = useNavigate()
  let user = useLoaderData()
  console.log(user)
  const screenSize = true

  return (
    <section className={styles.homepage}>
        <h1 className={styles.logo}>SETLIST</h1>
      <header>
        <h1>Home</h1>
        <button className={styles.importbtn}>
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
          {/* Add that cool transition here */}
          {/* <div className={styles.profile_overlay}>
            <p>A</p>
          </div> */}
        </div>
      </header>

      <div className={styles.homepage__filters}>
        <input type="text" placeholder="Search" className={styles.searchBar} />
      </div>

      <section className={styles.homepage__content}>
        <h2>Playlists</h2>
        <div className={styles.homepage__content__filters}></div>
        <div className={styles.homepage__content__playlists}></div>
      </section>
    </section>
  )
}

{
  /* <button onClick={() => navigate('/profile')}>Go to Profile</button>
<button onClick={() => navigate('/search')}>Go to Search</button> */
}

// <img src={user.images[1].url} alt="profile picture"/>
