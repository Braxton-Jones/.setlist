import styles from '../styles/modal.module.scss'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <button className={styles.close_button} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
