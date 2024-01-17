import styles from '../styles/modal.module.scss'

const Modal = ({ isOpen, onClose, children, resetState }) => {
  if (!isOpen) return null
  const handleClose = () => {
    onClose()
    resetState()
  }

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <button className={styles.close_button} onClick={handleClose}>
          X
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal

