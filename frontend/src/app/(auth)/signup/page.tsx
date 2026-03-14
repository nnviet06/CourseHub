"use client";
import styles from '../Auth.module.css'
import { useState } from 'react'
import FullNameField from '../../../components/(auth)/FullNameField'
import EmailField from '../../../components/(auth)/EmailField'
import PasswordField from '../../../components/(auth)/PasswordField'

type Role = 'instructor' | 'learner';

export default function SignUp() {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSignUp = (role: Role) => {
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    console.log('User sign up for role', role);
  }

  return (
    <div className={styles.SignUp}>
      <form className={styles.SignUpForm}>
        <h1>Sign Up</h1>
        <FullNameField value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <EmailField value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <PasswordField label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="button" onClick={() => handleSignUp('learner')}>Sign Up As Learner</button>
        <button type="button" onClick={() => handleSignUp('instructor')}>Sign Up As Instructor</button>
        <p>
          Already have an account? <a href="/login">Log In</a>
        </p>
      </form>
    </div>
  )
}
