import React from 'react'
import { Link, useRouteError, useNavigate } from 'react-router-dom'
import styles from '../styles/error404.module.scss'

export default function Error404() {
  const error = useRouteError()
  const navigate = useNavigate()
  console.log(error)
  return (
    <div className={styles.error404}>
      <div>
        <h1>Oops! Something went wrong or the page was not found</h1>
        <p>
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <button
          onClick={() => {
            navigate('/')
          }}
          className={styles.returnBtn}
        >
          Go back to homepage
        </button>
      </div>
    </div>
  )
}
