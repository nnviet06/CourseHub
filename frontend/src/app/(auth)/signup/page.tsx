"use client";
import styles from '../Auth.module.css'
import { useState } from 'react'


export default function SignUp() {

  return (
    <div
      className={styles.SignUp}
    >
      {/* <img */}
      {/*   src="https://www.letseatcake.com/wp-content/uploads/2021/07/funny-memes-13.jpg" */}
      {/*   alt="login image" */}
      {/*   className="login__img" */}
      {/* /> */}

      <form className={styles.SignUpForm}>
        <h1>Sign Up</h1>
        <div
          className={styles.TextField}
        >
          <i className="bx bx-lock-alt"></i>
          <div>
            <input
              type="email"
              required
              placeholder=""
            />
            <label>Username</label>
          </div>
        </div>
        <div
          className={styles.PasswordField}
        >
          <i className="ri-lock-2-line"></i>
          <div>
            <input
              type="password"
              required
              id="login-pas"
              placeholder=""
            />
            <label>Password</label>
            <i className="ri-eye-off-line"></i>
          </div>
        </div>
        <button type="submit">Sign Up As Learner</button>
        <button type="submit">Sign Up As Instructor</button>
        <p>
          Already have an account? <a href="/login">Log In</a>
        </p>
      </form >
    </div >
  )
}
