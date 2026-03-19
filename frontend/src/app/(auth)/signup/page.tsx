"use client";
import styles from '../Auth.module.css'
import { useState } from 'react'
import UsernameField from '../../../components/(auth)/UsernameField'

type Role = 'instructor' | 'learner';

export default function SignUp() {
  const [role, setRole] = useState<Role>('learner');
  const [sliding, setSliding] = useState(false);
  const [username, setUsername] = useState<string>('');

  const handleSignUp = () => {
    if (!username.trim()) {
      console.error('Username is required');
      return;
    }
    console.log('User sign up as', role, 'with username', username);
  }

  const switchRole = () => {
    if (sliding) return;
    setSliding(true);
    setTimeout(() => {
      setRole(prev => prev === 'learner' ? 'instructor' : 'learner');
    }, 150);
    setTimeout(() => {
      setSliding(false);
    }, 200);
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
          <UsernameField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
    </div>
  )
}
