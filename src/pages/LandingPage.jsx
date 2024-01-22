import styles from '../styles/landingpage.module.scss'
export default function LandingPage() {
  return (
    <main>
      <header className={styles.header}></header>
      <section className={styles.landing_page}>
        <section className={styles.hero}>
          <h1 className={styles.title}>SETLIST</h1>

          <p className={styles.subtitle}>
            Where music enthusiasts come together to share their
            curated playlists.
          </p>

          <div className={styles.btn_container}>
            <a className={styles.btn} href="https://setlistapi.onrender.com/login">
              Log In
            </a>
          </div>
        </section>

        <section className={styles.how}>
          <h3 className={styles.how_title}>How Setlist works.</h3>
          <div className={styles.step}>
            <h4>Step 1: Connect Your Spotify Account</h4>
            <p>
              Link your Spotify account to Setlist. Your playlists will
              become an integral part of your profile, creating a musical
              identity that truly represents you.
            </p>
          </div>
          <div className={styles.step}>
            <h4>Step 2: Import your Playlists</h4>
            <p>
              Easily import your existing playlists into Setlist. Our
              seamless integration allows you to bring in your favorite music
              effortlessly, expanding the diversity of your musical collection.
            </p>
          </div>

          <div className={styles.step}>
            <h4>Step 3: Discover other Playlists</h4>
            <p>
              Dive into a world of musical exploration. Discover playlists
              curated by fellow music enthusiasts. From trending hits to hidden
              gems, explore a variety of musical genres and expand your musical
              horizons.
            </p>
          </div>
        </section>
      </section>
      <section className={styles.footer}>
        <p>
          Created with Love by{' '}
          <a href="https://portfolio.braxtonjones.dev/">BRX</a> 💜
        </p>
      </section>
    </main>
  )
}
