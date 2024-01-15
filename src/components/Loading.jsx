import styles from '../styles/loading.module.scss'
export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.lds_grid}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
