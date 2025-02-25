import React from 'react'
import styles from './Default.module.css'
import defaultImg from '../../assets/content/default-image.png'
import lock from '../../assets/content/lock.png'
const Default = () => {
  return (
    <div className={styles.defaultContainer}>
         <div className={styles.imgContainer}>
        <img src={defaultImg} alt="Default Image" />
      </div>
      <div className={styles.header}>
        <h1>Pocket Notes</h1>
      </div>
      <div className={styles.subHeader}>
        <p>
          Send and receive messages without keeping your phone online.
          <br /> Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>

      <div className={styles.footer}>
      <img src={lock} alt="lock" />
      <p>end-to-end encrypted</p>
      </div>
    </div>
  )
}

export default Default