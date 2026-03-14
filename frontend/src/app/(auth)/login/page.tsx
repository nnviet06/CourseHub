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
    <div className={styles.Login}>
      <form className={styles.LoginForm}>
        <h1>Log In</h1>
        <EmailField value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={handleLogin}>Log In</button>
        <p>
          Don&apos;t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  )
}
