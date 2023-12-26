import styles from '../styles/landingpage.module.scss'
export default function LandingPage() {
    return (
        <main>
            <h1 className={styles.title}>Welcome to Crescendo Club!</h1>
            <p className={styles.description}>
            Crescendo Club is a social media platform for 
            everyone to talk about thier favorite music
            </p>
            <div className={styles.btn_container}>
                <button className={styles.btn}>Sign Up</button>
                <button className={styles.btn}>Log In</button>
            </div>
        </main>
    )
}