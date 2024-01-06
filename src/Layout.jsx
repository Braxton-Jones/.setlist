import styles from './styles/layout.module.scss'
import { Outlet } from 'react-router-dom'
export default function Layout() {
  return (
    <main>
      <header className={styles.header}>
        <p>CrescendoClub</p>
        {/* Logged in */}
      </header>
      <Outlet />
      <section className={styles.footer}>
        <p>
          Created with Love by{' '}
          <a href="https://portfolio.braxtonjones.dev/">BRX</a> 💜
        </p>
      </section>
    </main>
  )
}
