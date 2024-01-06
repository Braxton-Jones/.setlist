import styles from '../styles/landingpage.module.scss'
export default function LandingPage() {
  return (
    <section className={styles.landing_page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Making Music More Social.</h1>

        <p className={styles.subtitle}>
          A social hub where music enthusiasts come together to share their
          favorite tracks and curated playlists.
        </p>

        <div className={styles.btn_container}>
          <button className={styles.btn}>Sign Up</button>
          <button className={styles.btn}>Log In</button>
        </div>
      </section>

      <section className={styles.why}>
        <h2 className={styles.why_title}>
          Discovering the Harmony Between Music and Connections.
        </h2>
        <div className={styles.why_subtitle}>
          <ul>
            <li>Connect with others who share your unique taste in music.</li>
            <li>
              Explore curated playlists tailored to your unique preferences.
            </li>
            <li>Make posts about your favorite songs.</li>
            <li>Dissect specific sections of songs.</li>
            <li>Curate playlists that tell your story.</li>
            <li>Share the emotions that certain lyrics evoke.</li>
            <li>Connect with a community that understands what you hear.</li>
          </ul>
        </div>
      </section>

      <section className={styles.how}>
        <h3 className={styles.how_title}>How CrescendoClub works.</h3>
        <div className={styles.step}>
          <h4>Step 1: Connect Your Spotify Account</h4>
          <p>
            Link your Spotify account to CrescendoClub. Your favorite tunes will
            become an integral part of your profile, creating a musical identity
            that truly represents you.
          </p>
        </div>
        <div className={styles.step}>
          <h4>Step 2: Discover Your Musical Soulmates</h4>
          <p>
            Our matchmaking algorithm goes beyond the surface, analyzing your
            music preferences to connect you with like-minded individuals. Say
            goodbye to generic connections; CrescendoClub is where real musical
            bonds are formed.
          </p>
        </div>
        <div className={styles.step}>
          <h4>Step 3: Dive into Personalized Playlists</h4>
          <p>
            Explore curated playlists tailored to your unique music taste.
            Connect with others who vibe with the same tracks, and let the music
            be the starting point for meaningful conversations and new
            connections.
          </p>
        </div>
      </section>
    </section>
  )
}
