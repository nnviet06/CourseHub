// Login.tsx
"use client";
import styles from '../Auth.module.css'
import { useState } from 'react'
import EmailField from '../../../components/(auth)/EmailField'
import PasswordField from '../../../components/(auth)/PasswordField'

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    console.log('User login');
  }

  return (
    <div className={styles.AuthPage}>
      {/* Visual Side */}
      <div className={`${styles.VisualSide} ${styles.VisualLogin}`}>
        <div className={styles.VisualContent}>
          <span className={styles.VisualEmoji}>📚</span>
          <p className={styles.VisualRole}>Welcome Back</p>
        </div>
      </div>

      {/* Form Side */}
      <div className={styles.FormSide}>
        <form className={styles.Form}>
          <h1>Log In</h1>
          <EmailField value={email} onChange={(e) => setEmail(e.target.value)} />
          <PasswordField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="button" className={styles.SubmitButton} onClick={handleLogin}>
            Log In
          </button>
          <p>
            Don&apos;t have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  )
}
