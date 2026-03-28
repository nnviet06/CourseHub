"use client";
import styles from '../Auth.module.css'
import { useState } from 'react'
import UsernameField from '../../../components/(auth)/UsernameField'
import PasswordField from '../../../components/(auth)/PasswordField'
import { login } from '../../../services/authService'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim()) {
      console.error('Username is required');
      return;
    }
    setLoading(true)
    login(username, password)
      .then(() => router.push('/dashboard'))
      .catch(setError)
      .finally(() => setLoading(false))
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
        <form className={styles.Form} onSubmit={handleLogin}>
          <h1>Log In</h1>
          <UsernameField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={loading}
            type="submit"
            className={styles.SubmitButton}
          >
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
