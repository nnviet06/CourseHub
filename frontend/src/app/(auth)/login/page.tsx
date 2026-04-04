// Login.tsx
"use client";
import styles from '../Auth.module.css'
import { useState } from 'react'
import EmailField from '../../../components/(auth)/EmailField'
import PasswordField from '../../../components/(auth)/PasswordField'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error('Please provide all required information.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      toast.error('Passwords do not match.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    toast.success('Log in successful', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
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
