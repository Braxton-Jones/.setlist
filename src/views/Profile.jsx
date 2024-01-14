import { Await, useNavigate } from 'react-router-dom'
import styles from '../styles/profile.module.scss'
import { Suspense } from 'react'
import { getUserInfo } from '../utility/spotifyAPI_Interactions'
export default function Profile() {
  let navigate = useNavigate()
  const userPromise = getUserInfo('wq44goybfrffvmpp1baqm4h2x')
  return (
    <div className={styles.profile_wrapper}>
      <section className={styles.profile}>
        <div className={styles.profile_header}>
          <h1>Profile</h1>
          <button onClick={() => navigate('/')}>
            <span className={styles.arrow}>🡠</span>Go Home
          </button>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={userPromise}>
            {(user) => {
              console.log(user)
              return (
                <div>
                  <div className={styles.profile_content}>
                    <img src={user.images[0].url} alt="profile" />
                    <h2>Name: {user.display_name}</h2>
                  </div>

                  <div className={styles.profile_playlists}>
                    <h2>Playlists Shared</h2>
                    <div className={styles.profile_playlists_list}></div>
                  </div>
                </div>
              )
            }}
          </Await>
        </Suspense>
      </section>
    </div>
  )
}
