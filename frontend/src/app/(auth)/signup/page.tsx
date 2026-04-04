// SignUp.tsx
"use client";
import styles from '../Auth.module.css'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import FullNameField from '../../../components/(auth)/FullNameField'
import EmailField from '../../../components/(auth)/EmailField'
import PasswordField from '../../../components/(auth)/PasswordField'


type Role = 'instructor' | 'learner';

export default function SignUp() {
  const [role, setRole] = useState<Role>('learner');
  const [sliding, setSliding] = useState(false);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSignUp = () => {
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
    toast.success('Sign up successful', {
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
    console.log('User sign up for role', role);
  }

  const switchRole = () => {
    if (sliding) return;
    setSliding(true);
    setTimeout(() => {
      setRole(prev => prev === 'learner' ? 'instructor' : 'learner');
    }, 150); // swap immediately at cover
    setTimeout(() => {
      setSliding(false);
    }, 200); // reveal almost instantly after swap
  }

  return (
    <div className={[
      styles.AuthPage,
      role === 'instructor' ? styles.AuthPageInstructor : styles.AuthPageLearner,
    ].join(' ')}>

      <div className={[
        styles.SweepOverlay,
        role === 'instructor' ? styles.SweepInstructor : styles.SweepLearner,
        sliding ? styles.SweepActive : ''
      ].join(' ')} />

      {/* Form Side */}
      <div className={styles.FormSide}>
        <form className={styles.Form}>
          <h1>Sign Up as {role === 'learner' ? 'Learner' : 'Instructor'}</h1>

          <FullNameField
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <EmailField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordField
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="button"
            className={styles.SubmitButton}
            onClick={handleSignUp}
          >
            Sign Up
          </button>

          <p>
            Already have an account? <a href="/login">Log In</a>
          </p>
        </form>
      </div>

      {/* Visual Side */}
      <div className={[
        styles.VisualSide,
        role === 'instructor' ? styles.VisualInstructor : styles.VisualLearner
      ].join(' ')}>
        <div className={styles.VisualContent}>
          <span className={[
            styles.VisualEmoji,
            sliding ? styles.VisualEmojiHidden : ''
          ].join(' ')}>
            {role === 'learner' ? '🎓' : '👨‍🏫'}
          </span>
          <button
            type="button"
            className={styles.GhostButton}
            onClick={switchRole}
          >
            Join as {role === 'learner' ? 'Instructor' : 'Learner'}
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>

  )
}
